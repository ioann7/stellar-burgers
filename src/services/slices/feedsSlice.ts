import { getFeedsApi, TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { FEEDS_SLICE, RequestStatus } from '../../utils/constants';

export const getFeeds = createAsyncThunk<TFeedsResponse, void>(
  `${FEEDS_SLICE}/getFeeds`,
  async () => await getFeedsApi()
);

type TFeedsState = {
  ordersData: TOrdersData;
  status: RequestStatus;
};

const initialState: TFeedsState = {
  ordersData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  status: RequestStatus.idle
};

export const feedsSlice = createSlice({
  name: FEEDS_SLICE,
  initialState,
  reducers: {},
  selectors: {
    getFeedOrdersDataSelector: (state: TFeedsState) => state.ordersData,
    getFeedsStatusSelector: (state: TFeedsState) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.status = RequestStatus.failed;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.ordersData = {
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      });
  }
});

export const feedsReducer = feedsSlice.reducer;
export const { getFeedOrdersDataSelector, getFeedsStatusSelector } =
  feedsSlice.selectors;
