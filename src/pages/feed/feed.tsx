import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import store, { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getFeed } from '../../slices/ordersSlice';
import { RootState } from '../../services/store';
import { get } from 'http';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.feed.orders
  );
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        getFeed();
      }}
    />
  );
};
