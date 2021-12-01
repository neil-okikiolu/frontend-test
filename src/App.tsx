import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import store from "./store";
import ListRestaurantsPage from "components/pages/ListRestaurantsPage";
import RestaurantDetailsPage from "components/pages/RestaurantDetailsPage";
import "./App.scss";

const App = () => (
  <StoreProvider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/restaurants" />} />
        <Route path="/restaurants" element={<ListRestaurantsPage />} />;
        <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />;
      </Routes>
    </BrowserRouter>
  </StoreProvider>
);

export default App;
