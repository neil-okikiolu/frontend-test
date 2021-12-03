import axios from "../api";

export const searchBusinesses = (data) => {
  return axios.get("/businesses/search", {
    params: {
      ...data,
      term: "restaurants",
      price: data.price || "1,2,3,4",
      categories:data.categories || "italian,seafoods,steakhouses,japanese,american,mexican,thai",
      location: "Las Vegas"
    }
  });
};

export const getBusiness = (id) => {
  return axios.get(`/businesses/${id}`);
};

export const getBusinessReviews = (id) => {
  return axios.get(`/businesses/${id}/reviews`);
};
