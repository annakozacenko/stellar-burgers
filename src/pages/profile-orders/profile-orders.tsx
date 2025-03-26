import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { getUserOrders } from '../../slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** done-TODO: взять переменную из стора */
  const orders = useSelector((state: RootState) => state.orders.orders);
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
