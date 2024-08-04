import { FC } from 'react';
import { ProtectedRouteProps } from './type';
import { useSelector } from '../../services/store';
import {
  getAuthCheckedSelector,
  getUserSelector
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const user = useSelector(getUserSelector);
  const location = useLocation();
  const isAuthChecked = useSelector(getAuthCheckedSelector);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const state = from.backgroundLocation || null;
    return <Navigate replace to={from} state={state} />;
  }

  if (!onlyUnAuth && !user) {
    const from = {
      ...location,
      backgroundLocation: location.state?.backgroundLocation
    };
    return <Navigate replace to='/login' state={{ from }} />;
  }

  return children;
};
