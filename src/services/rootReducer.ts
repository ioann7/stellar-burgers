import { combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsReducer,
  ingredientsSlice
} from './slices/ingredientsSlice';
import { feedsReducer, feedsSlice } from './slices/feedsSlice';
import { ordersReducer, ordersSlice } from './slices/ordersSlice';
import { orderReducer, orderSlice } from './slices/orderSlice';
import { userReducer, userSlice } from './slices/userSlice';
import {
  burgerConstructorReducer,
  burgerConstructorSlice
} from './slices/burgerConstructorSlice';

export default combineReducers({
  [ingredientsSlice.name]: ingredientsReducer,
  [feedsSlice.name]: feedsReducer,
  [ordersSlice.name]: ordersReducer,
  [orderSlice.name]: orderReducer,
  [userSlice.name]: userReducer,
  [burgerConstructorSlice.name]: burgerConstructorReducer
});
