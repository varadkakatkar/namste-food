import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  // Filter out empty restaurant objects
  const validRestaurants = restaurants.filter((restaurant) => restaurant.info);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const locations = [
        { lat: 12.9716, lng: 77.5946 },   // Bengaluru
        { lat: 19.0760, lng: 72.8777 },   // Mumbai
        { lat: 28.6139, lng: 77.2090 },   // Delhi
        { lat: 17.3850, lng: 78.4867 },   // Hyderabad
        { lat: 18.5204, lng: 73.8567 },   // Pune
      ];

      const tryFetch = async (url) => {
        const res = await fetch(url, { headers: { Accept: 'application/json, text/plain, */*' } });
        if (!res.ok) return null;
        let json;
        try {
          json = await res.json();
        } catch (_) {
          const text = await res.text();
          try {
            json = JSON.parse(text);
          } catch (err) {
            return null;
          }
        }
        return json;
      };

      let json = null;
      for (const loc of locations) {
        const url = `http://localhost:3030/api/restaurants?lat=${loc.lat}&lng=${loc.lng}`;
        json = await tryFetch(url);
        if (json) break;
      }
      console.log('json ',json)
      const items = json?.data?.cards?.find((c) =>
        c?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? validRestaurants;

      setListOfRestaurants(items);
      setIsLoading(false);
    } catch (e) {
      // Silent fallback to mock data
      setListOfRestaurants(validRestaurants);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Shimmer />
  }

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
