import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BURGER_CONSTRUCTOR_SLICE } from '../../utils/constants';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: BURGER_CONSTRUCTOR_SLICE,
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = { ...ingredient };
        } else {
          state.ingredients = [...state.ingredients, ingredient];
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeItemByIndex: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients = [
        ...state.ingredients.slice(0, index),
        ...state.ingredients.slice(index + 1)
      ];
    },
    moveUpByIndex: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients = [
        ...state.ingredients.slice(0, index - 1),
        state.ingredients[index],
        state.ingredients[index - 1],
        ...state.ingredients.slice(index + 1)
      ];
    },
    moveDownByIndex: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients = [
        ...state.ingredients.slice(0, index),
        state.ingredients[index + 1],
        state.ingredients[index],
        ...state.ingredients.slice(index + 2)
      ];
    },
    reset: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBurgerConstructorSelector: (state: TBurgerConstructorState) => state
  }
});

export const burgerConstructorActions = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { getBurgerConstructorSelector } =
  burgerConstructorSlice.selectors;
