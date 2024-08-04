import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedOrdersDataSelector,
  getFeeds
} from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrdersDataSelector).orders;

  const getFeedsCallback = useCallback(() => {
    dispatch(getFeeds());
  }, []);

  useEffect(() => {
    getFeedsCallback();
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeedsCallback} />;
};
