import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE, RequestStatus } from '../../utils/constants';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export const getIngredients = createAsyncThunk<TIngredient[], void>(
  `${INGREDIENTS_SLICE}/getIngredients`,
  async () => await getIngredientsApi()
);

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  status: RequestStatus;
};

const initialState: TIngredientsState = {
  ingredients: [],
  status: RequestStatus.idle
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE,
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state: TIngredientsState) => state.ingredients,
    getIngredientByIdSelector: (state: TIngredientsState, id: string) =>
      state.ingredients.find((ingredient) => ingredient._id === id) || null,
    getIngredientsStatusSelector: (state: TIngredientsState) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.failed;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const {
  getIngredientsSelector,
  getIngredientByIdSelector,
  getIngredientsStatusSelector
} = ingredientsSlice.selectors;
