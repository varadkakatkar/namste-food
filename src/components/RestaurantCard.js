import { CDN_URL } from "../utils/constants.js";
import { Link } from "react-router-dom";

const RestaurantCard = (props) => {
  const { resData } = props;
  return (
    <Link to={`/restaurants/${resData.info.id}`} className="res-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={`${CDN_URL}/${resData.info.cloudinaryImageId}`}
      />
      <h3>{resData.info.name}</h3>
      <h4>{resData.info.cuisines}</h4>
      <h4>{resData.info.avgRatingString}</h4>
      <h4>{resData.info.costForTwo}</h4>
      <h4>{resData.info.sla.deliveryTime} Minutes</h4>
    </Link>
  );
};

export default RestaurantCard;