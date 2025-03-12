// netlify/functions/cancel-payment-intent.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { paymentIntentId } = JSON.parse(event.body);
    const canceledIntent = await stripe.paymentIntents.cancel(paymentIntentId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "PaymentIntent canceled successfully",
        canceledIntent,
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
