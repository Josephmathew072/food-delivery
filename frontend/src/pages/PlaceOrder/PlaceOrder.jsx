import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const MINIMUM_CART_VALUE = 70;
const DISCOUNT_AMOUNT = 5;
const DELIVERY_FEE = 2;

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, promoApplied } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    Zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.street || !data.city || !data.state || !data.Zipcode || !data.country || !data.phone) {
      toast.error("Please fill all required fields.");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: promoApplied ? getTotalCartAmount() + DELIVERY_FEE - DISCOUNT_AMOUNT : getTotalCartAmount() + DELIVERY_FEE,
      promoApplied,
    };

    try {
      let response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const cod = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.street || !data.city || !data.state || !data.Zipcode || !data.country || !data.phone) {
      toast.error("Please fill all required fields.");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: promoApplied ? getTotalCartAmount() + DELIVERY_FEE - DISCOUNT_AMOUNT : getTotalCartAmount() + DELIVERY_FEE,
      promoApplied,
    };

    try {
      let response = await axios.post(
        `${url}/api/order/cod`,
        orderData,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.warn("Please login to continue.");
      navigate("/cart");
    }
  }, [token, navigate]);

  // Calculate subtotal, discount, and final total
  const totalAmount = getTotalCartAmount();
  const discount = promoApplied && totalAmount >= MINIMUM_CART_VALUE ? DISCOUNT_AMOUNT : 0;
  const finalTotal = totalAmount + DELIVERY_FEE - discount;

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name="firstName" placeholder="First Name" onChange={onChangeHandler} value={data.firstName} />
          <input required type="text" name="lastName" placeholder="Last Name" onChange={onChangeHandler} value={data.lastName} />
        </div>
        <input required type="email" name="email" placeholder="Email Address" onChange={onChangeHandler} value={data.email} />
        <input required type="text" name="street" placeholder="Street" onChange={onChangeHandler} value={data.street} />
        <div className="multi-fields">
          <input required type="text" name="city" placeholder="City" onChange={onChangeHandler} value={data.city} />
          <input required type="text" name="state" placeholder="State" onChange={onChangeHandler} value={data.state} />
        </div>
        <div className="multi-fields">
          <input required type="text" name="Zipcode" placeholder="Zip Code" onChange={onChangeHandler} value={data.Zipcode} />
          <input required type="text" name="country" placeholder="Country" onChange={onChangeHandler} value={data.country} />
        </div>
        <input required type="text" name="phone" placeholder="Phone" onChange={onChangeHandler} value={data.phone} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${DELIVERY_FEE.toFixed(2)}</p>
            </div>
            {discount > 0 && (
              <>
                <hr />
                <div className="cart-total-details">
                  <p>Discount</p>
                  <p>- ${discount.toFixed(2)}</p>
                </div>
              </>
            )}
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${finalTotal.toFixed(2)}</b>
            </div>
          </div>
          <button type="button" onClick={placeOrder}>PROCEED TO PAYMENT</button>
          <button type="button" onClick={cod}>CASH ON DELIVERY</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
