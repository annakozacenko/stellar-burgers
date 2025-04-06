import {
  ordersSlice,
  getFeed,
  getUserOrders,
  getOrderByNumber
} from '../slices/ordersSlice';
import { TOrder } from '@utils-types';

describe('Тестирование ordersSlice', () => {
  const reducer = ordersSlice.reducer;
  const initialState = {
    orders: [],
    feed: { orders: [], total: 0, totalToday: 0 },
    isLoading: false,
    error: null,
    order: null
  };

  const testOrders: TOrder[] = [
    {
      _id: '1111',
      status: 'done',
      name: 'Тестовый заказ 1',
      createdAt: '2025-04-06T12:00:00.000Z',
      updatedAt: '2025-04-06T12:00:00.000Z',
      number: 1111,
      ingredients: ['ingredient1', 'ingredient2']
    },
    {
      _id: '2222',
      status: 'done',
      name: 'Тестовый заказ 2',
      createdAt: '2025-04-06T13:00:00.000Z',
      updatedAt: '2025-04-06T13:00:00.000Z',
      number: 2222,
      ingredients: ['ingredient3', 'ingredient4']
    }
  ];

  describe('Тестирование загрузки ленты заказов', () => {
    test('Лента заказов загружается (pending)', () => {
      const newState = reducer(initialState, getFeed.pending(''));
      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('Лента заказов загружается успешно (fulfilled)', () => {
      const testResponse = {
        success: true,
        orders: testOrders,
        total: 2,
        totalToday: 1
      };
      const newState = reducer(
        initialState,
        getFeed.fulfilled(testResponse, '')
      );
      expect(newState).toEqual({
        ...initialState,
        feed: testResponse
      });
    });

    test('Лента заказов не загружается (rejected)', () => {
      const error = new Error('Ошибка загрузки ленты');
      const newState = reducer(initialState, getFeed.rejected(error, ''));
      expect(newState).toEqual({
        ...initialState,
        error: error.message
      });
    });
  });

  describe('Тестирование загрузки пользовательских заказов', () => {
    test('Пользовательские заказы загружаются (pending)', () => {
      const newState = reducer(initialState, getUserOrders.pending(''));
      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('Пользовательские заказы загружаются успешно (fulfilled)', () => {
      const newState = reducer(
        initialState,
        getUserOrders.fulfilled(testOrders, '')
      );
      expect(newState).toEqual({
        ...initialState,
        orders: testOrders
      });
    });

    test('Пользовательские заказы не загружаются (rejected)', () => {
      const error = new Error('Ошибка загрузки заказов');
      const newState = reducer(initialState, getUserOrders.rejected(error, ''));
      expect(newState).toEqual({
        ...initialState,
        error: error.message
      });
    });
  });

  describe('Тестирование поиска заказа по номеру', () => {
    test('Заказ по номеру загружается (pending)', () => {
      const newState = reducer(
        initialState,
        getOrderByNumber.pending('', 1111)
      );
      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('Заказ по номеру загружается успешно (fulfilled)', () => {
      const testResponse = {
        success: true,
        orders: [testOrders[0]]
      };
      const newState = reducer(
        initialState,
        getOrderByNumber.fulfilled(testResponse, '', 1111)
      );
      expect(newState).toEqual({
        ...initialState,
        order: testOrders[0]
      });
    });

    test('Заказ по номеру не загружается (rejected)', () => {
      const error = new Error('Ошибка поиска заказа');
      const newState = reducer(
        initialState,
        getOrderByNumber.rejected(error, '', 1111)
      );
      expect(newState).toEqual({
        ...initialState,
        error: error.message
      });
    });
  });
});
