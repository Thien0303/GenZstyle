import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBanUserAdmin, getListUser, getPostAdmin, updatePost } from "../../api/admin";
export const getAllUser = createAsyncThunk(
  "system/getAllUser",
  async (thunkAPI) => {
    try {
      const response = await getListUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllPostAdmin = createAsyncThunk(
    "system/getAllPostAdmin",
    async (thunkAPI) => {
        try {
            const response = await getPostAdmin();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateAllReport = createAsyncThunk(
  "order/updateAllReport",
  async ({id, status}, thunkAPI) => {
      try {
          const response = await updatePost(id, status);
          return response;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
      }
  }
);
export const getAllBanUserAdmin = createAsyncThunk(
  "system/getAllBanUserAdmin",
  async (thunkAPI) => {
      try {
          const response = await getBanUserAdmin();
          return response;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
      }
  }
);