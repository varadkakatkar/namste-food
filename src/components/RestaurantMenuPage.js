import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuShimmer from "./MenuShimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const restaurantId = id;
  const { restaurantInfo, menuItems, loading } =
    useRestaurantMenu(restaurantId);

  if (loading) {
    return <MenuShimmer />;
  }

  return (
    <div className="menu">
      {restaurantInfo && (
        <div className="restaurant-info">
          <h1>{restaurantInfo.name}</h1>
          <div className="restaurant-details">
            <p>
              <strong>Cuisines:</strong> {restaurantInfo.cuisines?.join(", ")}
            </p>
            <p>
              <strong>Rating:</strong> {restaurantInfo.avgRating} ⭐
            </p>
            <p>
              <strong>Cost for Two:</strong> ₹{restaurantInfo.costForTwo / 100}
            </p>
            <p>
              <strong>Delivery Time:</strong> {restaurantInfo.sla?.deliveryTime}{" "}
              minutes
            </p>
            <p>
              <strong>Area:</strong> {restaurantInfo.areaName}
            </p>
            <p>
              <strong>Address:</strong> {restaurantInfo.areaName},{" "}
              {restaurantInfo.city}
            </p>
          </div>
        </div>
      )}

      <div className="menu-section">
        <h2>Menu Items</h2>
        {menuItems.length > 0 ? (
          <div className="menu-items">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <p className="item-category">
                    <em>{item.category}</em>
                  </p>
                </div>
                <div className="item-price">
                  <span className="price">₹{item.price / 100}</span>
                  {item.defaultPrice && item.defaultPrice !== item.price && (
                    <span className="original-price">
                      ₹{item.defaultPrice / 100}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No menu items available</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
