const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Проверяем, что это POST запрос
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const body = JSON.parse(event.body);
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6IjliY2Y2ODE0ZDNjMmQyYjg1NDU1Y2FmOGQ0NWY0MzY1NTU3MjE4ZTZiYzkyNGRjNjA4ZmZjMmY1ZTZhY2NlMTkyZjRmYzQxMmQyZDg2MmRjIiwiaWF0IjoxNzExNTE1NzY1LjI3MDUzNiwibmJmIjoxNzExNTE1NzY1LjI3MDUzOCwiZXhwIjoxNzQzMDUxNzY1LjI2NDQ5Miwic3ViIjoiMTc2MTE4NzciLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.ATwOGX6vLIO2Fr2XgYzxLmPoDloWF-9ysIPQimDAoPRW3Mf3PT4Ser2LZK4HAbezvAj7O1tywP9tv40e71A"
    const response = await fetch(
      "https://api.printify.com/v1/shops/15137568/orders/shipping.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          // Вставьте здесь необходимые заголовки для аутентификации
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
