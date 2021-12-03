import Ratings from "components/shared/Ratings";
import { useAppDispatch } from "../../../hooks";
import React, { useEffect, useState } from "react";
import RestaurantReviewItem from "./components/RestaurantReviewItem";
import {
  getBusinessRequest,
  GetBusinessResponse,
  BusinessReviewProps,
  getBusinessReviewsRequest
} from "../../../store/slices/businessSlice";
import "./styles.scss";
import { useParams } from "react-router";
import produce from "immer";
import { unwrapResult } from "@reduxjs/toolkit";
import BusinessMap from "./components/BusinessMap";

interface StateProps {
  isFetchingDetails: boolean;
  isFetchingReviews: boolean;
  businessDetails: GetBusinessResponse;
  businessReviews: BusinessReviewProps[];
}

const RestaurantDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { id: businessId } = useParams();

  const [state, setState] = useState<StateProps>({
    isFetchingDetails: true,
    isFetchingReviews: true,
    businessDetails: {
      id: "",
      alias: "",
      name: "",
      coordinates: {
        longitude: 0,
        latitude: 0
      },
      location: {
        displayAddress: []
      },
      categories: [],
      isClosed: false,
      imageUrl: "",
      photos: [],
      price: "",
      reviewCount: 0,
      rating: 0
    },
    businessReviews: []
  });

  const featuredCategoryTitle =
    state.businessDetails?.categories[0]?.title || "";

  useEffect(() => {
    if (businessId) {
      getBusiness(businessId);
      getBusinessReviews(businessId);
    }
  }, [businessId]);

  const getBusiness = async (id: string) => {
    const resultAction = await dispatch(getBusinessRequest(id));

    if (getBusinessRequest.fulfilled.match(resultAction)) {
      const response = unwrapResult(resultAction);
      setState(
        produce((draft) => {
          draft.isFetchingDetails = false;
          draft.businessDetails = response;
        })
      );
    }
  };

  const getBusinessReviews = async (id: string) => {
    const resultAction = await dispatch(getBusinessReviewsRequest(id));

    if (getBusinessReviewsRequest.fulfilled.match(resultAction)) {
      const response = unwrapResult(resultAction);
      setState(
        produce((draft) => {
          draft.isFetchingReviews = false;
          draft.businessReviews = response.reviews;
        })
      );
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="page__title">{state.businessDetails.name}</h1>
          <Ratings
            containerClassName="restaurant__ratings-container"
            score={state.businessDetails.rating}
            maximum={5}
          />
          <div className="restaurant__info-container">
            <div className="restaurant__dish-description">
              {featuredCategoryTitle} • {state.businessDetails.price}
            </div>
            <div className="restaurant__status-container">
              <div
                className={`restaurant__status-icon ${
                  state.businessDetails.isClosed
                    ? "restaurant__status-icon--closed"
                    : "restaurant__status-icon--open"
                }`}
              />
              <span className="restaurant__status-description">
                {state.businessDetails.isClosed ? "Closed" : "Open now"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="restaurant__description-container">
        <div className="container">
          <div className="restaurant__map-and-images-grid">
            <div>
              <BusinessMap
                coordinates={state.businessDetails.coordinates}
                mapMarkerIconClass="restaurant__map-marker-icon"
              />
            </div>
            {state.businessDetails.photos.slice(0, 2).map((photo) => (
              <div key={photo}>
                <img
                  className="restaurant__featured-picture"
                  src={photo}
                  alt={state.businessDetails.name}
                />
              </div>
            ))}
          </div>
          <div className="restaurant__description__address">
            {state.businessDetails.location.displayAddress.join(", ")}
          </div>
        </div>
      </div>

      <section className="restaurant-review-items__wrapper">
        <div className="container">
          <h3 className="restaurant-review-items__count">
            {state.businessDetails.reviewCount} Reviews
          </h3>

          <div className="restaurant-review-items__container">
            {state.businessReviews.map((review) => (
              <RestaurantReviewItem key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantDetailsPage;
