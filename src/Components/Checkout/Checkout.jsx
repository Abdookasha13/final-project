import "./Checkout.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    // Get user info from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/sign/in");
      return;
    }

    // Try to get stored user info
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser) {
      setUserInfo({
        fullName: storedUser.name || "",
        email: storedUser.email || "",
      });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.discountPrice || item.price || 0),
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="container py-5">
          <div className="empty-checkout">
            <i className="fas fa-shopping-cart"></i>
            <h3>Your cart is empty</h3>
            <p>Add some courses to checkout</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="container py-5">
        <div className="checkout-header">
          <h1>Complete your order</h1>
        </div>

        <div className="checkout-content">
          {/* Left Side - User Info */}
          <div className="checkout-left">
            <div className="checkout-section">
              <div className="section-header">
                <i className="fas fa-user"></i>
                <h2>User Information</h2>
              </div>

              <form className="user-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={userInfo.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </form>
            </div>

            {/* Payment Section */}
            <div className="checkout-section">
              <div className="section-header">
                <i className="fas fa-credit-card"></i>
                <h2>Payment Method</h2>
              </div>

              <div className="payment-wrapper">
                {isProcessing && (
                  <div className="processing-overlay">
                    <div className="spinner"></div>
                    <p>Processing your payment...</p>
                  </div>
                )}
                <PayPalButtons
                  createOrder={async () => {
                    try {
                      setIsProcessing(true);

                      if (!userInfo.fullName || !userInfo.email) {
                        toast.error("Please fill in all required fields");
                        setIsProcessing(false);
                        throw new Error("Missing required fields");
                      }

                      const res = await axios.post(
                        "http://localhost:1911/create-order",
                        {
                          items: cartItems.map((item) => ({
                            courseId: item.courseId,
                          })),
                          userInfo,
                        }
                      );

                      console.log("💳 Order ID:", res.data.id);
                      setIsProcessing(false);
                      return res.data.id;
                    } catch (error) {
                      setIsProcessing(false);
                      console.error(
                        "CREATE ORDER FRONTEND ERROR:",
                        error.response?.data || error
                      );
                      toast.error("Failed to create order");
                      throw error;
                    }
                  }}
                  onApprove={async (data) => {
                    try {
                      setIsProcessing(true);
                      console.log("💳 Capturing order ID:", data.orderID);

                      const res = await axios.post(
                        "http://localhost:1911/capture-order",
                        {
                          orderId: data.orderID,
                        }
                      );

                      console.log("✅ Payment successful:", res.data);
                      setIsProcessing(false);
                      toast.success(
                        "Payment successful! Welcome to your courses!"
                      );
                      setTimeout(() => navigate("/courses"), 2000);
                    } catch (err) {
                      console.error(
                        "CAPTURE FRONTEND ERROR:",
                        err.response?.data || err
                      );
                      setIsProcessing(false);
                      toast.error("Payment failed. Please try again.");
                    }
                  }}
                  onError={(err) => {
                    setIsProcessing(false);
                    toast.error("Payment error occurred");
                    console.error(err);
                  }}
                  onCancel={() => {
                    setIsProcessing(false);
                    toast.info("Payment cancelled");
                  }}
                  style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "rect",
                    label: "paypal",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="checkout-right">
            <div className="checkout-section order-summary">
              <div className="section-header">
                <i className="fas fa-shopping-bag"></i>
                <h2>Order Summary</h2>
              </div>

              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.courseId} className="order-item">
                    <div className="item-image">
                      <img src={item.thumbnailUrl} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p className="item-instructor">
                        <i className="fas fa-chalkboard-teacher"></i>
                        {item.instructorName || "Instructor"}
                      </p>
                    </div>
                    <div className="item-price">
                      <span className="current-price">
                        ${item.discountPrice || item.price}
                      </span>
                      {item.price && item.discountPrice && (
                        <span className="original-price">${item.price}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-pricing">
                <div className="pricing-row">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="pricing-divider"></div>
                <div className="pricing-row total">
                  <span>Total Amount:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="order-info">
                <div className="info-item">
                  <i className="fas fa-shield-alt"></i>
                  <span>Secure Payment</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-infinity"></i>
                  <span>Lifetime Access</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-certificate"></i>
                  <span>Certificate Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
