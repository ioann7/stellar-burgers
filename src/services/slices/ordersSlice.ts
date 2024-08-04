import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ORDERS_SLICE, RequestStatus } from '../../utils/constants';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk<TOrder[], void>(
  `${ORDERS_SLICE}/getOrders`,
  async () => await getOrdersApi()
);

type TOrdersState = {
  orders: TOrder[];
  status: RequestStatus;
};

const initialState: TOrdersState = {
  orders: [],
  status: RequestStatus.idle
};

export const ordersSlice = createSlice({
  name: ORDERS_SLICE,
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state: TOrdersState) => state.orders,
    getOrdersStatusSelector: (state: TOrdersState) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.failed;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.orders = action.payload;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const { getOrdersSelector, getOrdersStatusSelector } =
  ordersSlice.selectors;
