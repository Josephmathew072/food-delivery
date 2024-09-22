import React, { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure you have this package installed
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully.");
        // Update local orders state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        
      } else {
        toast.error(response.data.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Update error:", error.response ? error.response.data : error);
      toast.error("Failed to update order status. Please try again.");
    }
  };

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x{item.quantity}
                    {idx < order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div className="order-item-address">
                <p>{`${order.address.street},`}</p>
                <p>
                  {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>
              ${order.amount}{" "}
              {(!order.payment && order.cod) ? (
                <b>(COD)</b>
              ) : (
                <b>(Paid)</b>
              )}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
