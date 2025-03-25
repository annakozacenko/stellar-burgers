import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { RootState } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** done-TODO: взять переменную из стора */
  const orders = useSelector((state: RootState) => state.orders.orders);

  return <ProfileOrdersUI orders={orders} />;
};
