import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  getOrdersApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type ordersState = {
  orders: TOrder[];
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
  order: TOrder | null;
};

const initialState: ordersState = {
  orders: [],
  feed: { orders: [], total: 0, totalToday: 0 },
  isLoading: false,
  error: null,
  order: null
};

export const getFeed = createAsyncThunk('orders/getFeed', getFeedsApi);
export const getUserOrders = createAsyncThunk('orders/getOrders', getOrdersApi);
export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  selectors: {
    ordersFeedSelector: (state) => state.feed,
    ordersFeedOrdersSelector: (state) => state.feed.orders,
    ordersSelector: (state) => state.orders,
    ordersSelectedOrderSelector: (state) => state.order
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.feed = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { clearOrder } = ordersSlice.actions;
export const {
  ordersFeedSelector,
  ordersFeedOrdersSelector,
  ordersSelector,
  ordersSelectedOrderSelector
} = ordersSlice.selectors;
