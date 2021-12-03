import Ratings from "components/shared/Ratings";
import React from "react";
import { BusinessReviewProps, User } from "src/store/slices/businessSlice";
import "./styles.scss";

interface RestaurantReviewItemProps {
  review: BusinessReviewProps;
}

const RestaurantReviewItem: React.FC<RestaurantReviewItemProps> = ({
  review
}) => {
  const { rating, text, timeCreated, user } = review;
  const createdAt = timeCreated.split(" ")[0].split("-").reverse().join("/");

  return (
    <div className="restaurant-review-item">
      <div className="restaurant-review-item__user">
        <img
          className="restaurant-review-item__user__picture"
          src={user.imageUrl}
          alt={user.name}
        />
        <div className="restaurant-review-item__user-text-container">
          <span className="restaurant-review-item__user__name">
            {user.name}
          </span>
          <span className="restaurant-review-item__user__date">
            {createdAt}
          </span>
        </div>
      </div>
      <div className="restaurant-review-item__content">
        <Ratings
          containerClassName="restaurant-review-item__ratings-container"
          score={rating}
          maximum={5}
        />

        <div className="restaurant-review-item__body">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantReviewItem;
