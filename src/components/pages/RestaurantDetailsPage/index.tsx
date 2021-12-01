import Ratings from "components/shared/Ratings";
import React from "react";
import RestaurantReviewItem from "./components/RestaurantReviewItem";
// import RestaurantItem from "./components/RestaurantItem";
import "./styles.scss";

const RestaurantDetailsPage = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="page__title">Restaurant 3</h1>
          <Ratings
            containerClassName="restaurant__ratings-container"
            score={3.5}
            maximum={5}
          />
          <div className="restaurant__info-container">
            <div className="restaurant__dish-description">Thai • $$$$</div>
            <div className="restaurant__status-container">
              <div className="restaurant__status-icon restaurant__status-icon--open" />
              <span className="restaurant__status-description">Open Now</span>
            </div>
          </div>
        </div>
      </header>

      <div className="restaurant__description-container">
        <div className="container">
          <div className="restaurant__map-and-images-grid">
            <div>sdsdsd</div>
            <img
              className="restaurant__featured-picture"
              src="https://picsum.photos/400/200"
              alt="food"
            />
            <img
              className="restaurant__featured-picture"
              src="https://picsum.photos/400/200"
              alt="food"
            />
          </div>
          <div className="restaurant__description__address">
            624 S La Brea Ave Los Angeles, CA 90036
          </div>
        </div>
      </div>

      <section className="restaurant-review-items__wrapper">
        <div className="container">
          <h3 className="restaurant-review-items__count">321 Reviews</h3>

          <div className="restaurant-review-items__container">
            {[...Array(3)].map((_, index) => (
              <RestaurantReviewItem />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantDetailsPage;
