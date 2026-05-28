const Razorpay =
  require("razorpay");

const crypto =
  require("crypto");

const razorpay =
  new Razorpay({
    key_id:
      process.env
        .RAZORPAY_KEY_ID,

    key_secret:
      process.env
        .RAZORPAY_KEY_SECRET,
  });

exports.processPayment =
  async (
    req,
    res
  ) => {

    try {

      const options =
        {
          amount:
            Number(
              req.body
                .amount
            ) * 100,

          currency:
            "INR",

          receipt:
            "receipt_" +
            Date.now(),
        };

      const order =
        await razorpay
          .orders
          .create(
            options
          );

      res
        .status(200)
        .json({
          success:
            true,
          order,
        });

    } catch (
      error
    ) {

      console.log(
        error
      );

      res
        .status(500)
        .json({
          success:
            false,
          message:
            error.message,
        });
    }
  };

exports.verifyPayment =
  async (
    req,
    res
  ) => {

    try {

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } =
        req.body;

      const body =
        razorpay_order_id +
        "|" +
        razorpay_payment_id;

      const expectedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            body
          )
          .digest(
            "hex"
          );

      if (
        expectedSignature ===
        razorpay_signature
      ) {

        return res
          .status(
            200
          )
          .json({
            success:
              true,
            message:
              "Payment verified",
          });
      }

      return res
        .status(400)
        .json({
          success:
            false,
          message:
            "Invalid signature",
        });

    } catch (
      error
    ) {

      res
        .status(500)
        .json({
          success:
            false,
          message:
            error.message,
        });
    }
  };