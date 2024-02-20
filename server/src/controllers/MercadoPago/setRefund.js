const setRefund = async (req, res) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: "access_token",
      options: { timeout: 5000 },
    });

    const refund = new PaymentRefund(client);

    refund
      .create({
        payment_id: "123456789",
        body: {
          amount: 100,
        },
      })
      .then(console.log)
      .catch(console.log);
  } catch (error) {
    return res.status(500).json({ error: error.message });
    s;
  }
};

module.exports = setRefund;
