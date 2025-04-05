import { PayloadAction } from '@reduxjs/toolkit';
import {
  constructorSlice,
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearBurgerConstructor
} from '../slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('constructorSlice reducer', () => {
  const initialState = {
    ingredients: [],
    bun: null
  };

  const bun: TConstructorIngredient = {
    _id: '1',
    id: 'bun1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 100,
    image: 'bun.png',
    image_mobile: 'bun-mobile.png',
    image_large: 'bun-large.png'
  };

  const ingredient1: TConstructorIngredient = {
    _id: '2',
    id: 'ing1',
    name: 'Котлета',
    type: 'main',
    proteins: 50,
    fat: 60,
    carbohydrates: 70,
    calories: 80,
    price: 200,
    image: 'meat.png',
    image_mobile: 'meat-mobile.png',
    image_large: 'meat-large.png'
  };

  const ingredient2: TConstructorIngredient = {
    _id: '3',
    id: 'ing2',
    name: 'Соус',
    type: 'sauce',
    proteins: 5,
    fat: 10,
    carbohydrates: 15,
    calories: 20,
    price: 50,
    image: 'sauce.png',
    image_mobile: 'sauce-mobile.png',
    image_large: 'sauce-large.png'
  };

  const reducer = constructorSlice.reducer;

  describe('addIngredient', () => {
    test('добавляет булку, если тип "bun"', () => {
      const newState = reducer(initialState, addIngredient(bun));
      expect(newState.bun).toEqual(bun);
      expect(newState.ingredients).toEqual([]);
    });

    test('добавляет ингредиент в массив, если тип не "bun"', () => {
      const newState = reducer(initialState, addIngredient(ingredient1));
      expect(newState.ingredients).toEqual([ingredient1]);
      expect(newState.bun).toBeNull();
    });
  });

  describe('deleteIngredient', () => {
    test('удаляет ингредиент по id', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [ingredient1, ingredient2]
      };
      const newState = reducer(
        stateWithIngredients,
        deleteIngredient(ingredient1)
      );
      expect(newState.ingredients).toEqual([ingredient2]);
      expect(newState.bun).toBeNull();
    });
  });

  describe('moveIngredientUp', () => {
    test('перемещает ингредиент вверх', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [ingredient1, ingredient2]
      };
      const newState = reducer(
        stateWithIngredients,
        moveIngredientUp(ingredient2)
      );
      expect(newState.ingredients).toEqual([ingredient2, ingredient1]);
    });

    test('не изменяет порядок, если ингредиент уже первый', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [ingredient1, ingredient2]
      };
      const newState = reducer(stateWithIngredients, moveIngredientUp(bun));
      expect(newState.ingredients).toEqual([ingredient1, ingredient2]);
    });
  });

  describe('moveIngredientDown', () => {
    test('перемещает ингредиент вниз', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [ingredient1, ingredient2]
      };
      const newState = reducer(
        stateWithIngredients,
        moveIngredientDown(ingredient1)
      );
      expect(newState.ingredients).toEqual([ingredient2, ingredient1]);
    });

    test('не изменяет порядок, если ингредиент уже последний', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [ingredient1, ingredient2]
      };
      const newState = reducer(
        stateWithIngredients,
        moveIngredientDown(ingredient2)
      );
      expect(newState.ingredients).toEqual([ingredient1, ingredient2]);
    });
  });

  describe('clearBurgerConstructor', () => {
    test('очищает список ингредиентов и булку', () => {
      const stateWithData = {
        ...initialState,
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      };
      const newState = reducer(stateWithData, clearBurgerConstructor());
      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toEqual([]);
    });
  });
});
