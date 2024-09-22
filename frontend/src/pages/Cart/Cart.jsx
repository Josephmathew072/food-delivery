import React, { useContext, useState, useCallback } from "react";
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import './Cart.css';
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const PROMO_CODE = "TAYLOR25";
const MINIMUM_CART_VALUE = 70;
const DISCOUNT_AMOUNT = 5;
const DELIVERY_FEE = 2;

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount, promoApplied, applyPromoCode, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [validPromo, setValidPromo] = useState("");
  
  // useEffect(() => {
  //   if (Object.keys(cartItems).length === 0) {
  //     applyPromoCode(false);
  //   }
  // }, [cartItems, applyPromoCode]);

  const validatePromoCode = useCallback(() => {
    const totalAmount = getTotalCartAmount();
    if (promo === '') {
      setValidPromo("");
      applyPromoCode(false);
    } else if (promo === PROMO_CODE) {
      if (totalAmount >= MINIMUM_CART_VALUE) {
        setValidPromo("Promo code applied successfully!");
        applyPromoCode(true);
      } else {
        setValidPromo("Cart value must be more than $70 to avail this offer!");
        applyPromoCode(false);
      }
    } else {
      setValidPromo("Invalid Promo code.");
      applyPromoCode(false);
    }
  }, [promo, getTotalCartAmount, applyPromoCode]);

  const totalAmount = getTotalCartAmount();
  const discount = promoApplied && totalAmount >= MINIMUM_CART_VALUE ? DISCOUNT_AMOUNT : 0;
  const finalTotal = (totalAmount + DELIVERY_FEE - discount).toFixed(2);

  return (
    <>
      {totalAmount > 0 ? (
        <div className="cart">
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id}>
                    <div className="cart-items-title cart-items-item">
                      <img src={url + "/images/" + item.image} alt={item.name} />
                      <p>{item.name}</p>
                      <p>${item.price.toFixed(2)}</p>
                      <div className="cart-quantity-container">
                        <button type="button" className="quantity-controller-button" onClick={() => removeFromCart(item._id)} aria-label="Decrease quantity">
                          <BsDashSquare color="#52606D" size={12} />
                        </button>
                        <p>{cartItems[item._id]}</p>
                        <button type="button" className="quantity-controller-button" onClick={() => addToCart(item._id)} aria-label="Increase quantity">
                          <BsPlusSquare color="#52606D" size={12} />
                        </button>
                      </div>
                      <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                      <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="cart-bottom">
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
                  <p>${DELIVERY_FEE}</p>
                </div>
                {discount > 0 && (
                  <>
                    <hr />
                    <div className="cart-total-details">
                      <p>Discount</p>
                      <p>- ${discount}</p>
                    </div>
                  </>
                )}
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${finalTotal}</b>
                </div>
              </div>
              <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cart-promocode">
              <p>If you have a promo code, enter it here.</p>
              <div className="cart-promocode-input">
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="WELCOME100"
                />
                <button onClick={validatePromoCode} type="button">Submit</button>
              </div>
              {validPromo && <p>{validPromo}</p>}
              {!promoApplied && (
                <div className="promo-info">
                  <p>
                    Hi! Since you are here, delivery charges are on us! Apply
                    "TAYLOR25" code to avail the offer! Cart value must be $70 or above.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img src={assets.empty_cart} alt="Empty Cart" />
          <h2>Your cart is Empty.</h2>
          <p>Looks like you have not added anything to your cart. Go ahead and explore top categories.</p>
        </div>
      )}
    </>
  );
}

export default Cart;
