import { combineReducers, combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { constructorSlice } from '../slices/constructorSlice';
import { orderSlice } from '../slices/orderSlice';
import { ordersSlice } from '../slices/ordersSlice';
import { userSlice } from '../slices/userSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  ordersSlice,
  userSlice
);
console.log('rootReducer', rootReducer);

export default rootReducer;
