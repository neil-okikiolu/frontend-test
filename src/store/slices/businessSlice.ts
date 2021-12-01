import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Business } from "../../services/network";

interface BusinessState {
  data: [];
}

interface SearchBusinessesResponse {
  data: Record<string, string | object | []>;
}

interface SearchBusinessesRequestPayload {
  open_now?: boolean;
  price?: string;
  categories?: string;
  offset?: number;
  limit: number;
  location?: string;
}

const initialState: BusinessState = {
  data: []
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

export const businessSlice = createSlice({
  name: "businesses",
  initialState,
  reducers: {}
});

export default businessSlice.reducer;
