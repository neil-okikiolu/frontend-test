import Dropdown from "components/shared/Dropdown";
import RadioPicker from "components/shared/RadioPicker";
import React, { useEffect, useState } from "react";
import RestaurantItem from "./components/RestaurantItem";
import "./styles.scss";

const categoryOptions = [
  { label: "All", value: "All" },
  { label: "Breakfast", value: "Breakfast" },
  { label: "Lunch", value: "Lunch" },
  { label: "Dinner", value: "Dinner" }
];

const priceOptions = [
  { label: "All", value: "All" },
  { label: "$", value: "$" },
  { label: "$$", value: "$$" },
  { label: "$$$", value: "$$$" },
  { label: "$$$$", value: "$$$$" }
];

const Home = () => {
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const [openRestaurantsOnly, setOpenRestaurantsOnly] = useState(false);

  useEffect(() => {
    console.log({ category, price });
  }, [price, category]);

  return (
    <div className="container">
      <header className="header">
        <h1 className="page__title">Restaurants</h1>
        <h2 className="page__caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h2>
      </header>

      <div className="restaurant-items__search-container">
        <div className="restaurant-items__search-inputs-container">
          <span className="restaurant-items__filter-by-text">Filter By:</span>
          <RadioPicker
            label="Open Now"
            selected={openRestaurantsOnly}
            onClick={() => setOpenRestaurantsOnly(!openRestaurantsOnly)}
          />
          <Dropdown
            placeholder="Price"
            options={priceOptions}
            selectedOption={price}
            onSelect={setPrice}
          />
          <Dropdown
            placeholder="Categories"
            options={categoryOptions}
            selectedOption={category}
            onSelect={setCategory}
          />
        </div>
        <button className="btn btn--outline restaurant-items__clear-all-btn">
          Clear All
        </button>
      </div>

      <section>
        <h3 className="restaurant-items__category">All Restaurants</h3>

        <div className="restaurant-items__container">
          {[...Array(20)].map((_, index) => (
            <RestaurantItem key={index} />
          ))}
        </div>

        <div className="restaurant-items__footer">
          <a
            href="#/"
            className="btn btn--outline restaurant-item__load-more-btn"
          >
            Load More
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
