import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredientId, TOrder } from '@utils-types';
import { ORDER_SLICE, RequestStatus } from '../../utils/constants';

export const createOrder = createAsyncThunk<TOrder, TIngredientId[]>(
  `${ORDER_SLICE}/createOrder`,
  async (data) => await orderBurgerApi(data).then((response) => response.order)
);

export const getOrderByNumber = createAsyncThunk<TOrder, number>(
  `${ORDER_SLICE}/getOrderByNumber`,
  async (number) =>
    await getOrderByNumberApi(number).then(
      (response) => response.orders && response.orders[0]
    )
);

type TOrderState = {
  order: TOrder | null;
  status: RequestStatus;
};

const initialState: TOrderState = {
  order: null,
  status: RequestStatus.idle
};

export const orderSlice = createSlice({
  name: ORDER_SLICE,
  initialState,
  reducers: {
    reset: (state: TOrderState) => ({ ...state, order: null })
  },
  selectors: {
    getOrderSelector: (state: TOrderState) => state.order,
    getOrderStatusSelector: (state: TOrderState) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(createOrder.rejected, (state) => {
        state.status = RequestStatus.failed;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.status = RequestStatus.failed;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.order = action.payload;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const { getOrderSelector, getOrderStatusSelector } =
  orderSlice.selectors;
