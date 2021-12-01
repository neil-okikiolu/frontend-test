import axios from "../api";

export const searchBusinesses = (data) => {
  return axios.get("/businesses/search", {
    params: {
      ...data,
      open_now: true,
      price: "$$",
      categories: "italian",
      offset: 0,
      location: "Las Vegas"
    }
  });
};
