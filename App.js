import React from "react";
import ReactDOM from "react-dom/client"

const Header = () =>{
    return (
        <div className="header">
            <div className="logo-container">
                <img 
                className="logo"
                src="logo.png"
                />
            </div>
            <div className="nav-items">
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Cart</li>
            </div>

        </div>
    )

}


const AppLayout = () =>{
    return (
        <div className="app">
          {
            // header 
            <Header/>
          }
        </div>
    )

}


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout/>)