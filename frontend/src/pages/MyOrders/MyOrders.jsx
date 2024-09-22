import React, { useContext, useState, useEffect, useCallback } from "react";
import './MyOrders.css';
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from '../../context/StoreContext';
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorder`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders. Please try again.");
    }
  }, [url, token]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      console.warn("Token is missing or invalid.");
    }
  }, [token, fetchOrders]);

  const isLoggedIn = () => !!token || !!localStorage.getItem("Token");

  const renderOrderItems = (items) => {
    return items.map((item, index) => (
      <span key={index}>
        {item.name} x{item.quantity}
        {index < items.length - 1 && ", "}
      </span>
    ));
  };

  const renderOrderStatus = (order) => {
    return !order.payment && order.cod ? (
      <p><b>Cash on Delivery</b></p>
    ) : (
      <p><b className="text-black">Paid</b></p>
    );
  };

  return (
    <>
      {isLoggedIn() ? (
        <>
          {data.length === 0 ? (
            <div className="my-order-signout">
              <img src={assets.my_order} alt="" />
              <p>Your Order history is empty.</p>
            </div>
          ) : (
            <div className="my-orders">
              <h2>My Orders</h2>
              <div className="container">
                {data.reverse().map((order, index) => (
                  <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="parcel" />
                    <p>{renderOrderItems(order.items)}</p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p>
                      <span>&#x25cf;</span> &nbsp;
                      <b>{order.status}</b>
                    </p>
                    {renderOrderStatus(order)}
                    <button onClick={fetchOrders}>Track Order</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="my-order-signout">
          <img src={assets.my_order} alt="" />
          <p>Please Sign in to access your order history.</p>
        </div>
      )}
    </>
  );
};

export default MyOrders;
