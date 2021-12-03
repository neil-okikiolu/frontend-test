import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Business } from "../../services/network";

interface Location {
  displayAddress: any[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Category {
  alias: string;
  title: string;
}
export interface BusinessProps {
  id: string;
  name: string;
  alias: string;
  location: Location;
  coordinates: Coordinates;
  categories: Category[];
  isClosed: boolean;
  imageUrl: string;
  photos: any[];
  price: string;
  reviewCount: number;
  rating: number;
}

interface BusinessState {
  data: BusinessProps[];
  isTruncated: boolean;
}

interface SearchBusinessesResponse {
  businesses: [];
  total: number;
  region: Record<string, string | number | object | Array<{}>>;
}

export interface SearchBusinessesRequestPayload {
  openNow?: boolean;
  price?: string;
  categories?: string;
  offset?: number;
  limit: number;
  location?: string;
}

export interface GetBusinessResponse extends BusinessProps {}

export interface User {
  id: string;
  profileUrl: string;
  imageUrl: string;
  name: string;
}

export interface BusinessReviewProps {
  id: string;
  url: string;
  text: string;
  rating: number;
  timeCreated: string;
  user: User;
}
export interface GetBusinessReviewResponse {
  reviews: BusinessReviewProps[];
}

const initialState: BusinessState = {
  data: [],
  isTruncated: false
};

export const searchBusinessesRequest = createAsyncThunk<
  SearchBusinessesResponse,
  SearchBusinessesRequestPayload
>("businesses/search", async (payload, thunkAPI) => {
  try {
    const response = await Business.searchBusinesses(payload);
    return response.data as SearchBusinessesResponse;
  } catch (err: any) {
    if (!err.response) throw err;
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getBusinessRequest = createAsyncThunk<GetBusinessResponse, string>(
  "businesses/fetchOne",
  async (payload, thunkAPI) => {
    try {
      const response = await Business.getBusiness(payload);
      return response.data as GetBusinessResponse;
    } catch (err: any) {
      if (!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getBusinessReviewsRequest = createAsyncThunk<
  GetBusinessReviewResponse,
  string
>("businesses/fetchReviews", async (payload, thunkAPI) => {
  try {
    const response = await Business.getBusinessReviews(payload);
    return response.data as GetBusinessReviewResponse;
  } catch (err: any) {
    if (!err.response) throw err;
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const businessSlice = createSlice({
  name: "businesses",
  initialState,
  reducers: {
    clearBusinesses: (state) => {
      state.data = initialState.data;
      state.isTruncated = initialState.isTruncated;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchBusinessesRequest.fulfilled, (state, action) => {
      const { businesses, total: businessesCount } = action.payload;
      state.data = [...state.data, ...businesses];
      state.isTruncated = businesses.length < businessesCount;
    });
  }
});

export const { clearBusinesses } = businessSlice.actions;

export default businessSlice.reducer;
