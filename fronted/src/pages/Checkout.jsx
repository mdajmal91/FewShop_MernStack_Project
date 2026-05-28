import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  useSelector
} from "react-redux";

import "../style/checkout.css";

const Checkout = () => {

  const navigate =
    useNavigate();

  const {
    cartItems
  } = useSelector(
    (state) =>
      state.cart || {
        cartItems: []
      }
  );

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    paymentMethod,
    setPaymentMethod
  ] = useState("UPI");

  const amount =
    cartItems.reduce(
      (
        acc,
        item
      ) =>
        acc +
        item.price *
          (
            item.quantity ||
            1
          ),
      0
    );

  useEffect(() => {

    if (
      cartItems.length ===
      0
    ) {
      navigate("/cart");
    }
  }, [
    cartItems,
    navigate
  ]);

  const loadRazorpayScript =
    () => {

      return new Promise(
        (
          resolve
        ) => {

          const script =
            document.createElement(
              "script"
            );

          script.src =
            "https://checkout.razorpay.com/v1/checkout.js";

          script.onload =
            () =>
              resolve(
                true
              );

          script.onerror =
            () =>
              resolve(
                false
              );

          document.body.appendChild(
            script
          );
        }
      );
    };

  const handlePayment =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      console.log(
        "TOKEN:",
        token
      );

      if (!token) {

        alert(
          "Please login first"
        );

        navigate(
          "/login"
        );

        return;
      }

      if (
        paymentMethod ===
        "COD"
      ) {

        handleCODPayment();
        return;
      }

      const loaded =
        await loadRazorpayScript();

      if (
        !loaded
      ) {

        alert(
          "❌ Razorpay load failed"
        );

        return;
      }

      setLoading(
        true
      );

      try {

        const {
          data
        } =
          await axios.post(
            "http://localhost:5000/api/payments/process",
            {
              amount
            },
            {
              headers:
                {
                  Authorization:
                    `Bearer ${token}`
                }
            }
          );

        const order =
          data.order;

        const razorpayKey =
          "rzp_test_9nqj8sH7mLh1bP";

        const options =
          {
            key:
              razorpayKey,

            amount:
              order.amount,

            currency:
              order.currency,

            name:
              "FewShop",

            description:
              "FewShop Payment",

            order_id:
              order.id,

            handler:
              async function (
                response
              ) {

                try {

                  const verify =
                    await axios.post(
                      "http://localhost:5000/api/payments/verify",
                      {
                        razorpay_order_id:
                          response.razorpay_order_id,

                        razorpay_payment_id:
                          response.razorpay_payment_id,

                        razorpay_signature:
                          response.razorpay_signature
                      },
                      {
                        headers:
                          {
                            Authorization:
                              `Bearer ${token}`
                          }
                      }
                    );

                  if (
                    verify
                      .data
                      .success
                  ) {

                    alert(
                      "✅ Payment Successful!"
                    );

                    navigate(
                      "/order-success"
                    );

                  } else {

                    alert(
                      "❌ Payment verification failed"
                    );
                  }

                } catch (
                  error
                ) {

                  console.error(
                    error
                  );

                  alert(
                    "❌ Payment verify failed"
                  );
                }
              },

            modal:
              {
                ondismiss:
                  function () {
                    alert(
                      "Payment cancelled"
                    );
                  }
              },

            prefill:
              {
                name:
                  "FewShop Customer",

                email:
                  "customer@gmail.com",

                contact:
                  "9999999999"
              },

            theme:
              {
                color:
                  "#f6d96f"
              }
          };

        const paymentObject =
          new window.Razorpay(
            options
          );

        paymentObject.open();

      } catch (
        error
      ) {

        console.error(
          "Payment Error:",
          error.response
            ?.data ||
            error.message
        );

        alert(
          error
            .response
            ?.data
            ?.message ||
            "❌ Payment process failed."
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  const handleCODPayment =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      try {

        setLoading(
          true
        );

        const {
          data
        } =
          await axios.post(
            "http://localhost:5000/api/orders",
            {
              orderItems:
                cartItems,

              itemsPrice:
                amount,

              shippingPrice:
                0,

              taxPrice:
                0,

              totalPrice:
                amount,

              shippingInfo:
                {
                  address:
                    "Test Address",

                  city:
                    "Delhi",

                  state:
                    "Delhi",

                  country:
                    "India",

                  pinCode:
                    110001,

                  phoneNo:
                    9999999999
                },

              paymentInfo:
                {
                  id:
                    "COD_" +
                    Date.now(),

                  status:
                    "Pending"
                },

              paymentMethod:
                "COD"
            },
            {
              headers:
                {
                  Authorization:
                    `Bearer ${token}`
                }
            }
          );

        if (
          data.success
        ) {

          alert(
            "✅ Order placed successfully"
          );

          navigate(
            "/order-success"
          );
        }

      } catch (
        error
      ) {

        console.error(
          error
        );

        alert(
          error
            .response
            ?.data
            ?.message ||
            "❌ Failed to place order"
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  return (
    <div className="checkout-page">

      <div className="checkout-card">

        <h1>
          Checkout
        </h1>

        <p className="checkout-subtitle">
          Complete
          your secure
          payment
        </p>

        <div className="payment-method-selector">

          <div
            className={`method-option ${
              paymentMethod ===
              "UPI"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPaymentMethod(
                "UPI"
              )
            }
          >

            <div className="method-icon">
              💳
            </div>

            <div className="method-text">
              <strong>
                Online
                Payment
              </strong>

              <span>
                UPI,
                Cards,
                NetBanking
              </span>
            </div>

          </div>

          <div
            className={`method-option ${
              paymentMethod ===
              "COD"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setPaymentMethod(
                "COD"
              )
            }
          >

            <div className="method-icon">
              🚚
            </div>

            <div className="method-text">
              <strong>
                Cash On
                Delivery
              </strong>

              <span>
                Pay when
                delivered
              </span>
            </div>

          </div>

        </div>

        <div className="price-box">

          <span>
            Payable
            Amount
          </span>

          <h2>
            ₹
            {amount.toFixed(
              2
            )}
          </h2>

        </div>

        <div
          style={{
            marginBottom:
              "20px"
          }}
        >
          {
            cartItems.length
          }{" "}
          item(s)
          in cart
        </div>

        <button
          className="pay-btn"
          onClick={
            handlePayment
          }
          disabled={
            loading
          }
        >

          {loading
            ? "Processing..."
            : "💳 Confirm Order & Pay"}

        </button>

        <button
          className="back-btn"
          onClick={() =>
            navigate(
              "/cart"
            )
          }
        >
          ← Back To
          Cart
        </button>

      </div>

    </div>
  );
};

export default Checkout;