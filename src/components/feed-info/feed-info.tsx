import { FC } from 'react';
import { useSelector } from 'react-redux';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { RootState, useDispatch } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** done-TODO: взять переменные из стора */
  const feed = useSelector((state: RootState) => state.orders.feed);
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.feed.orders
  );

  const readyOrders = getOrders(orders, 'done');
  console.log(readyOrders);

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
