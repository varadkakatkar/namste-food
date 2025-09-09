import { useState } from "react";
import { LOGO_URL } from "../utils/constants.js";

const Header = () => {
  const [btnName, setBtnName] = useState("Login"); // whenever the setBtnName is calld , entre header is re rendered and in that case btnName is new variable in this case
  console.log("Header render ");
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO_URL} alt="Logo" className="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              btnName == "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {" "}
            {btnName}{" "}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
