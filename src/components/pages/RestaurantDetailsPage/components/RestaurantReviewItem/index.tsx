import Ratings from "components/shared/Ratings";
import React from "react";
import "./styles.scss";

const RestaurantReviewItem = () => (
  <div className="restaurant-review-item">
    <div className="restaurant-review-item__user">
      <img
        className="restaurant-review-item__user__picture"
        src="https://picsum.photos/400/200"
        alt="food"
      />
      <div className="restaurant-review-item__user-text-container">
        <span className="restaurant-review-item__user__name">Brian B.</span>
        <span className="restaurant-review-item__user__date">10/9/2018</span>
      </div>
    </div>
    <div className="restaurant-review-item__content">
      <Ratings
        containerClassName="restaurant-review-item__ratings-container"
        score={3.5}
        maximum={5}
      />

      <div className="restaurant-review-item__body">
        <p>
          Don't be fooled by the French name, this place oozes with Californian
          flair. Their space is phenomenal: bright, warm colors yet clean and
          inviting. I've been twice for brunch and both times have been
          incredible! On our next trip to LA, I should really check out dinner
          since they seem to do more classic French preparations at that time.
        </p>
        <br />
        <p>
          For brunch, drool over the cast-iron pots of shakshouka, perfectly
          jiggly eggs over kimchi fried rice, marvel at their artful breakfast
          toasts and do good by ordering a fresh squeezed green juice. You'll
          need it to feel less guilty when you devour their sweet sticky bun or
          their creamy delicious Hazelnut puffs. OMG. I'm still dreaming about
          those cream puffs right now ...
        </p>
        <br />
        <p>Calories be damned.</p>
      </div>
    </div>
  </div>
);

export default RestaurantReviewItem;
