// netlify/functions/create-payment-intent.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Сумма в минимальных единицах валюты, например, центах
      currency: "usd",
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        response: paymentIntent,
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
