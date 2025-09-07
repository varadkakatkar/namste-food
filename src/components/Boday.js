import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../utils/mockData";


const Body = () => {
  // Filter out empty restaurant objects
  const validRestaurants = restaurants.filter((restaurant) => restaurant.info);

  return (
    <div className="body">
      <div className="search">Search </div>
      <div className="res-container">
        {validRestaurants.map((restaurant, index) => (
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