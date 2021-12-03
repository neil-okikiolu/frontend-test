import Dropdown from "components/shared/Dropdown";
import RadioPicker from "components/shared/RadioPicker";
import produce from "immer";
import React, { useEffect, useState } from "react";
import categoryOptions from "src/config/categoryOptions";
import priceOptions from "src/config/priceOptions";
import { useAppDispatch, useAppSelector } from "src/hooks";
import {
  clearBusinesses,
  searchBusinessesRequest,
  SearchBusinessesRequestPayload
} from "src/store/slices/businessSlice";
import RestaurantItem from "./components/RestaurantItem";
import "./styles.scss";

const ListRestaurantsPage = () => {
  const dispatch = useAppDispatch();
  const businesses = useAppSelector((state) => state.businesses);
  const businessesPerPage = 12;

  const [state, setState] = useState({
    isFetching: true,
    isLoadingMore: false,
    price: "",
    category: "",
    openNow: false,
    offset: 0
  });

  const selectedCategory = categoryOptions.find(
    (c) => c.value === state.category
  )?.label;

  const setPrice = (price: string) => {
    setState(produce((draft) => void (draft.price = price)));
  };

  const setCategory = (category: string) => {
    setState(produce((draft) => void (draft.category = category)));
  };

  const setOpenNow = (isOpen: boolean) => {
    setState(produce((draft) => void (draft.openNow = isOpen)));
  };

  const resetSearchFilters = () => {
    setState(
      produce((draft) => {
        draft.price = "";
        draft.category = "";
        draft.openNow = false;
      })
    );
  };

  const getSearchBusinessesParams = () => ({
    limit: businessesPerPage,
    openNow: state.openNow,
    price: state.price,
    categories: state.category,
    offset: state.offset
  });

  useEffect(() => {
    dispatch(clearBusinesses());
    setState(produce((draft) => void (draft.isFetching = true)));
    searchBusinesses(getSearchBusinessesParams());
  }, [state.openNow, state.price, state.category]);

  useEffect(() => {
    if (state.offset !== 0) {
      setState(produce((draft) => void (draft.isLoadingMore = true)));
      searchBusinesses(getSearchBusinessesParams()).then(() => {
        setState(produce((draft) => void (draft.isLoadingMore = false)));
      });
    }
  }, [state.offset]);

  const searchBusinesses = async (params: SearchBusinessesRequestPayload) => {
    const resultAction = await dispatch(searchBusinessesRequest(params));

    if (searchBusinessesRequest.fulfilled.match(resultAction)) {
      setState(produce((draft) => void (draft.isFetching = false)));
    }
  };

  const fetchMoreBusinesses = () => {
    setState(
      produce((draft) => {
        draft.isFetching = true;
        draft.offset += businessesPerPage;
      })
    );
  };

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
            selected={state.openNow}
            onClick={() => setOpenNow(!state.openNow)}
          />
          <Dropdown
            placeholder="Price"
            options={priceOptions}
            selectedOption={state.price}
            onSelect={setPrice}
          />
          <Dropdown
            placeholder="Categories"
            options={categoryOptions}
            selectedOption={state.category}
            onSelect={setCategory}
          />
        </div>
        <button
          type="button"
          className="btn btn--outline restaurant-items__clear-all-btn"
          onClick={() => resetSearchFilters()}
          disabled={!state.price && !state.category && state.openNow === false}
        >
          Clear All
        </button>
      </div>

      <section className="restaurant-items__wrapper">
        <h3 className="restaurant-items__category">
          {!state.isFetching
            ? `${selectedCategory || "All"} Restaurants`
            : "Loading Restaurants..."}
        </h3>

        <div className="restaurant-items__container">
          {businesses.data.map((business) => (
            <RestaurantItem key={business.id} business={business} />
          ))}
        </div>

        {businesses.isTruncated && (
          <div className="restaurant-items__footer">
            <button
              className="btn btn--outline restaurant-item__load-more-btn"
              disabled={state.isLoadingMore}
              onClick={() => fetchMoreBusinesses()}
            >
              {state.isLoadingMore ? "Loading More..." : "Load More"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ListRestaurantsPage;
