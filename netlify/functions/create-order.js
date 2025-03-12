const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { paymentIntentId, items } = JSON.parse(event.body);

    // Здесь может быть дополнительная логика для валидации платежа
    // Например, получение подтвержденного PaymentIntent от Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      // Логика создания заказа
      // Это может включать запись в базу данных, интеграцию с CRM и т.д.

      const orderId = await postOrder(paymentIntent, items);

      return {
        statusCode: 200,
        body: JSON.stringify({
          paymentIntent: paymentIntent,
          success: true,
          orderId: orderId,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Payment not succeeded",
        }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};

async function generateUniqueId(apiBase, apiToken, attempts = 0) {
  if (attempts > 10)
    throw new Error("Превышено количество попыток генерации уникального ID");
  let id = Array.from({ length: 6 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
      Math.floor(Math.random() * 36)
    )
  ).join("");
  const isUnique = await isUniqueIdExists(id, apiBase, apiToken);
  !isUnique ? console.log(id) : console.log("еще");
  return isUnique ? generateUniqueId(apiBase, apiToken, attempts + 1) : id;
}

async function isUniqueIdExists(id, apiBase, apiToken) {
  try {
    const response = await fetch(
      `${apiBase}/content/item/Orders?filter=${encodeURIComponent(
        JSON.stringify({ ID: id })
      )}`,
      {
        method: "GET",
        headers: { "api-key": apiToken },
      }
    );
    return response.status !== 404;
  } catch (error) {
    console.error("Ошибка при проверке уникальности ID:", error);
    return true; // По умолчанию считаем, что ID может существовать
  }
}
function sendSubmission(apiBase, apiToken, orderId, payment, products) {
  const formToken = "96e13faa53d6db4489945e755aaa8cfbb8be9c16";
  const items = products.map(product => ({
      "ID": product.Item._id,
      "Title": product.Item.Title,
      "Information": product.Item.Information,
      "Quantity": product.Quantity,
      "Thumbnail": product.Item.Media.length ? product.Item.Media[0].thumbnail : '',
  }));

  const data = {
      "data": {
          "Order ID": orderId,
          "Items": items,
          "Payment": {
              "ID": payment.id,
              "Method": "Stripe",
              "Amount": payment.amount / 100 + " y.e",
          },
          "Contact": {
              "Name": payment.shipping?.name || "",
              "Email": payment.payer?.email_address || "",
              "Phone": payment.shipping?.phone || "",
          },
          "Shipping": {
              "Name": payment.shipping?.name || "",
              "Phone": payment.shipping?.phone || "",
              "Address 1": payment.shipping?.address?.line1 || "",
              "Address 2": payment.shipping?.address?.line2 || "",
              "State": payment.shipping?.address?.state || "",
              "City": payment.shipping?.address?.city || "",
              "Country": payment.shipping?.address?.country || "",
              "Postal Code": payment.shipping?.address?.postal_code || "",
          },
      },
  };

  fetch(`${apiBase}/inbox/submit/${formToken}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "api-key": apiToken,
      },
      body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((error) => console.error("Error:", error));
}


async function postOrder(payment, items) {
  const apiBase = process.env.API_BASE;
  const apiToken = process.env.API_TOKEN;
  const orderId = await generateUniqueId(apiBase, apiToken);
  const products = items;

  const data = {
    ID: orderId,
    Products: products,
    Payment: {
      ID: payment.id,
      Status: "Paid",
      Method: "Stripe", // Исправлено с Strapi на Stripe, если вы имели в виду платежную систему Stripe
      // Created и Updated можно добавить, если эти данные доступны и нужны
    },
    Shipment: {
      Name: payment.shipping?.name || "",
      Address1: payment.shipping?.address?.line1 || "",
      Address2: payment.shipping?.address?.line2 || "",
      State: payment.shipping?.address?.state || "",
      City: payment.shipping?.address?.city || "",
      Country: payment.shipping?.address?.country || "",
      PostalCode: payment.shipping?.address?.postal_code || "",
    },
    Contacts: {
      Name: payment.shipping?.name,
      Country: payment.shipping?.address?.country || "",
      Email: payment.payer?.email_address || "",
      Phone: payment.shipping?.phone || "",
    },
  };

  // Исправление для корректной отправки данных
  await fetch(`${apiBase}/content/item/Orders`, {
    method: "POST",
    headers: { "api-key": apiToken, "Content-Type": "application/json" },
    body: JSON.stringify({ data: data }), // Исправлено для корректного формата
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
  sendSubmission(apiBase, apiToken, orderId, payment, products);
  return orderId;
}
