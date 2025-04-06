import {
  userSlice,
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser
} from './userSlice';
import { TUser } from '@utils-types';

const initialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  error: null,
  loginUserRequest: false
};

const testUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const testRegisterData = {
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123'
};

const testLoginData = {
  email: 'test@example.com',
  password: 'password123'
};

const testUpdateData = {
  success: true,
  user: {
    email: 'updated@example.com',
    name: 'Updated User'
  }
};

describe('Тестирование слайса пользователя', () => {
  const reducer = userSlice.reducer;

  describe('Тестирование редьюсеров пользовательского слайса', () => {
    it('Проверяет работу функции getUser в статусе pending', () => {
      const actualState = reducer(initialState, getUser.pending(''));
      expect(actualState).toEqual({
        ...initialState,
        isAuthenticated: false,
        error: null,
        user: null,
        loginUserRequest: true
      });
    });

    it('Проверяет работу функции getUser в статусе fulfilled', () => {
      const actualState = reducer(
        initialState,
        getUser.fulfilled({ user: testUser, success: true }, '')
      );
      expect(actualState).toEqual({
        ...initialState,
        isAuthenticated: true,
        user: testUser,
        loginUserRequest: false,
        isAuthChecked: true
      });
    });

    it('Проверяет работу функции getUser в статусе rejected', () => {
      const error = new Error('Get user error');
      const actualState = reducer(initialState, getUser.rejected(error, ''));
      expect(actualState).toEqual({
        ...initialState,
        isAuthenticated: false,
        error: 'Get user error',
        user: null,
        loginUserRequest: false,
        isAuthChecked: true
      });
    });

    it('Проверяет работу функции registerUser в статусе pending', () => {
      const actualState = reducer(
        initialState,
        registerUser.pending('', testRegisterData)
      );
      expect(actualState).toEqual({
        ...initialState,
        isAuthenticated: false,
        error: null,
        user: null,
        loginUserRequest: true
      });
    });

    it('Проверяет работу функции registerUser в статусе fulfilled', () => {
      const actualState = reducer(
        initialState,
        registerUser.fulfilled(testUser, '', testRegisterData)
      );
      expect(actualState).toEqual({
        ...initialState,
        isAuthenticated: true,
        user: testUser,
        loginUserRequest: false
      });
    });

    it('Проверяет работу функции registerUser в статусе rejected', () => {
      const error = new Error('Register error');
      const actualState = reducer(
        initialState,
        registerUser.rejected(error, '', testRegisterData)
      );
      expect(actualState).toEqual({
        ...initialState,
        isAuthenticated: false,
        error: 'Register error',
        user: null
      });
    });

    it('Проверяет работу функции loginUser в статусе pending', () => {
      const actualState = reducer(
        initialState,
        loginUser.pending('', testLoginData)
      );
      expect(actualState).toEqual({
        ...initialState,
        error: null,
        loginUserRequest: true
      });
    });

    it('Проверяет работу функции loginUser в статусе fulfilled', () => {
      const actualState = reducer(
        initialState,
        loginUser.fulfilled(testUser, '', testLoginData)
      );
      expect(actualState).toEqual({
        ...initialState,
        isAuthenticated: true,
        user: testUser,
        loginUserRequest: false,
        isAuthChecked: true
      });
    });

    it('Проверяет работу функции loginUser в статусе rejected', () => {
      const error = new Error('Login error');
      const actualState = reducer(
        initialState,
        loginUser.rejected(error, '', testLoginData)
      );
      expect(actualState).toEqual({
        ...initialState,
        error: 'Login error',
        loginUserRequest: false,
        isAuthChecked: true
      });
    });

    it('Проверяет работу функции logoutUser в статусе pending', () => {
      const previousState = {
        ...initialState,
        isAuthenticated: true,
        user: testUser
      };
      const actualState = reducer(previousState, logoutUser.pending(''));
      expect(actualState).toEqual({
        ...previousState,
        loginUserRequest: true
      });
    });

    it('Проверяет работу функции logoutUser в статусе fulfilled', () => {
      const previousState = {
        ...initialState,
        isAuthenticated: true,
        user: testUser
      };
      const actualState = reducer(
        previousState,
        logoutUser.fulfilled({ success: true }, '')
      );
      expect(actualState).toEqual({
        ...initialState,
        isAuthenticated: false,
        user: null,
        loginUserRequest: false
      });
    });

    it('Проверяет работу функции logoutUser в статусе rejected', () => {
      const previousState = {
        ...initialState,
        isAuthenticated: true,
        user: testUser
      };
      const error = new Error('Logout error');
      const actualState = reducer(
        previousState,
        logoutUser.rejected(error, '')
      );
      expect(actualState).toEqual({
        ...previousState,
        isAuthenticated: false,
        error: 'Logout error',
        loginUserRequest: false
      });
    });

    it('Проверяет работу функции updateUser в статусе pending', () => {
      const previousState = {
        ...initialState,
        isAuthenticated: true,
        user: testUser
      };
      const actualState = reducer(
        previousState,
        updateUser.pending('', testUser)
      );
      expect(actualState).toEqual({
        ...previousState,
        loginUserRequest: true
      });
    });

    it('Проверяет работу функции updateUser в статусе fulfilled', () => {
      const actualState = reducer(
        initialState,
        updateUser.fulfilled(testUpdateData, '', testUser)
      );
      expect(actualState).toEqual({
        ...initialState,
        isAuthenticated: true,
        user: testUpdateData.user,
        loginUserRequest: false
      });
    });

    it('Проверяет работу функции updateUser в статусе rejected', () => {
      const error = new Error('Update error');
      const actualState = reducer(
        initialState,
        updateUser.rejected(error, '', testUser)
      );
      expect(actualState).toEqual({
        ...initialState,
        error: 'Update error',
        loginUserRequest: false
      });
    });
  });
});
