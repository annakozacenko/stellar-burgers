import rootReducer from './rootReducer';

describe('Тестирование инициализации стора', () => {
  test('Тестирование RootReducer, должен возвращать стейт без изменений', () => {
    const initialState = {
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      constructorItems: {
        ingredients: [],
        bun: null
      },
      order: {
        order: null,
        isLoading: false,
        error: null
      },
      orders: {
        orders: [],
        feed: { orders: [], total: 0, totalToday: 0 },
        isLoading: false,
        error: null,
        order: null
      },
      user: {
        isAuthChecked: false,
        isAuthenticated: false,
        user: null,
        error: null,
        loginUserRequest: false
      }
    };

    const UnknownAction = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(initialState, UnknownAction);
    expect(newState).toEqual(initialState);
  });
});
