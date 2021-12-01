import React from "react";
import "./styles.scss";

const RestaurantItem = () => (
  <div className="restaurant-item">
    <img
      className="restaurant-item__image"
      src="https://picsum.photos/400/200"
      alt="food"
    />

    <h3 className="restaurant-item__title">
      Very Long Name Restaurants Number 1 In List
    </h3>

    <div className="restaurant-item__info-container">
      <div className="restaurant-item__dish-description">Thai • $$$$</div>
      <div className="restaurant-item__status-container">
        <div className="restaurant-item__status-icon restaurant-item__status-icon--open" />
        <span className="restaurant-item__status-description">Open now</span>
      </div>
    </div>

    <a href="#/" className="btn restaurant-item__cta">
      Learn More
    </a>
  </div>
);

export default RestaurantItem;
