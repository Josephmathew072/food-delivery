import React, { useEffect, useState, useContext, useCallback } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);

  const [loading, setLoading] = useState(true);

  const verifyPayment = useCallback(async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/myorders");
      } else {
        toast.error(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred while verifying payment.");
      console.error("Verification error:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [url, success, orderId, navigate]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="verify">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <h2>Verification Complete</h2>
        </div>
      )}
    </div>
  );
};

export default Verify;
