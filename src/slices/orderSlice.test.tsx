import { orderSlice, makeOrder } from '../slices/orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice reducer', () => {
  const initialState = {
    order: null,
    isLoading: false,
    error: null
  };

  const testOrderResponse = {
    order: {
      _id: 'order123',
      status: 'done',
      name: 'Тестовый заказ',
      createdAt: '2025-04-04T00:00:00.000Z',
      updatedAt: '2025-04-04T00:00:00.000Z',
      number: 12345,
      ingredients: ['ingredient1', 'ingredient2']
    },
    success: true,
    name: 'Тестовый заказ'
  };

  const testOrder: TOrder = testOrderResponse.order;

  const reducer = orderSlice.reducer;

  describe('makeOrder', () => {
    test('устанавливает isLoading в true и сбрасывает error при pending', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };
      const newState = reducer(
        stateWithError,
        makeOrder.pending('', ['ingredient1', 'ingredient2'])
      );
      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('записывает заказ и сбрасывает isLoading и error при fulfilled', () => {
      const stateLoading = {
        ...initialState,
        isLoading: true,
        error: 'Предыдущая ошибка'
      };
      const newState = reducer(
        stateLoading,
        makeOrder.fulfilled(testOrderResponse, '', [
          'ingredient1',
          'ingredient2'
        ])
      );
      expect(newState).toEqual({
        ...initialState,
        order: testOrder,
        isLoading: false,
        error: null
      });
    });

    test('записывает ошибку и сбрасывает isLoading при rejected', () => {
      const errorMessage = 'Ошибка оформления заказа';
      const stateLoading = {
        ...initialState,
        isLoading: true
      };
      const newState = reducer(
        stateLoading,
        makeOrder.rejected(new Error(errorMessage), '', [
          'ingredient1',
          'ingredient2'
        ])
      );
      expect(newState).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });
});
