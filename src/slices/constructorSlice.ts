import { getIngredientsApi } from '@api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type ingredientsState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};

const initialState: ingredientsState = {
  ingredients: [],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'constructorItems',
  initialState,
  selectors: {
    constructorItemsSelector: (state) => state
  },
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredientUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > 0) {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      }
    },
    moveIngredientDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearBurgerConstructor
} = constructorSlice.actions;

export const { constructorItemsSelector } = constructorSlice.selectors;
