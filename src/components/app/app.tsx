import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import store, { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../slices/ingredientsSlice';
import { checkUserAuth } from '../../slices/userSlice';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background || location;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const somt = useSelector((state) => state.orders.order);
  console.log('вывод состояния', somt);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>

      {location.state?.background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                children={<IngredientDetails />}
                title='Детали ингредиента'
                onClose={() => navigate('/')}
              />
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                children={<OrderInfo />}
                title='Детали заказа'
                onClose={() => navigate('/feed')}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                children={
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                }
                title='Детали заказа'
                onClose={() => navigate('/profile/orders')}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
