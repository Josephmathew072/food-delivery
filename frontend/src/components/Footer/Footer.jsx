import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="logo" className='logo' />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum officiis quod sapiente fugit qui unde vero hic et iste, tempora facere laborum laboriosam nostrum laudantium soluta alias? Quod, tempore quos.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="facebook" />
                <img src={assets.twitter_icon} alt="twitter" />
                <a
                href="https://www.linkedin.com/in/joseph-mathew-aikara"
                target="_blank"
                class="tooltip-icon"
                rel='noreferrer'
                >
                <img src={assets.linkedin_icon} alt="linkedIn" />
            </a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9645881397</li>
                <li>contact@foodmunch.com</li>
                <li>No.1, local, city, state,India<br/>-pincode</li>
            </ul>
        </div>
      </div>
      <hr />
      <p>Copyright 2024 FoodMunch.com - All Rights Reserved</p>
      <p>This project is purely for educational purposes, no real business transactions are involved. All food data is owned by The Food Munch Group.</p>
    </div>
  )
}

export default Footer
