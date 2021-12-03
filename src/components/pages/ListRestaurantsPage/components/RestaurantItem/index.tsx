import Ratings from "components/shared/Ratings";
import React from "react";
import { Link } from "react-router-dom";
import { BusinessProps } from "src/store/slices/businessSlice";
import "./styles.scss";

interface RestaurantItemProps {
  business: BusinessProps;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({ business }) => {
  const { alias, name, imageUrl, isClosed, rating, price } = business;
  const [{ title: featuredCategoryTitle }] = business.categories;

  return (
    <div className="restaurant-item">
      <div>
        <img className="restaurant-item__image" src={imageUrl} alt={name} />

        <h3 className="restaurant-item__title">{name}</h3>

        <Ratings
          containerClassName="restaurant-item__ratings-container"
          score={rating}
          maximum={5}
        />

        <div className="restaurant-item__info-container">
          <div className="restaurant-item__dish-description">
            {featuredCategoryTitle} • {price}
          </div>
          <div className="restaurant-item__status-container">
            <div
              className={`restaurant-item__status-icon ${
                isClosed
                  ? "restaurant-item__status-icon--closed"
                  : "restaurant-item__status-icon--open"
              }`}
            />
            <span className="restaurant-item__status-description">
              {isClosed ? "Closed" : "Open now"}
            </span>
          </div>
        </div>
      </div>

      <Link to={`/restaurants/${alias}`} className="btn restaurant-item__cta">
        Learn More
      </Link>
    </div>
  );
};

export default RestaurantItem;
