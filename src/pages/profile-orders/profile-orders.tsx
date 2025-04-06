import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrders, ordersSelector } from '../../slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(ordersSelector);
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
