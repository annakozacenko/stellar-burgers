import { ingredientsSlice, getIngredients } from '../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('Тестирование ingredientsSlice reducer', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  const testIngredients: TIngredient[] = [
    {
      _id: '1',
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
    },
    {
      _id: '2',
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
    }
  ];

  const reducer = ingredientsSlice.reducer;

  describe('Тестирование getIngredients', () => {
    test('устанавливает isLoading в true и сбрасывает error при pending', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };
      const newState = reducer(stateWithError, getIngredients.pending(''));
      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('записывает ингредиенты и сбрасывает isLoading и error при fulfilled', () => {
      const stateLoading = {
        ...initialState,
        isLoading: true,
        error: 'Предыдущая ошибка'
      };
      const newState = reducer(
        stateLoading,
        getIngredients.fulfilled(testIngredients, '')
      );
      expect(newState).toEqual({
        ...initialState,
        ingredients: testIngredients,
        isLoading: false,
        error: null
      });
    });

    test('записывает ошибку и сбрасывает isLoading при rejected', () => {
      const errorMessage = 'Ошибка загрузки';
      const stateLoading = {
        ...initialState,
        isLoading: true
      };
      const newState = reducer(
        stateLoading,
        getIngredients.rejected(new Error(errorMessage), '')
      );
      expect(newState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });
});
