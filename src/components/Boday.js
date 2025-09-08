import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  // Filter out empty restaurant objects
  const validRestaurants = restaurants.filter((restaurant) => restaurant.info);
  const [listOfRestaurants, setListOfRestaurants] = useState(validRestaurants);
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            setListOfRestaurants(
              listOfRestaurants.filter((res) => res.info.avgRating > 4.3)
            );
          }}
        >
          Top rated Restaurants
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            setListOfRestaurants(validRestaurants);
          }}
        >
          Reset
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant, index) => (
          <RestaurantCard
            key={restaurant.info.id || index}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
