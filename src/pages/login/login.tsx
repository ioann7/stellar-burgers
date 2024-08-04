import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserErrorSelector,
  getUserStatusSelector,
  loginUser
} from '../../services/slices/userSlice';
import { RequestStatus } from '../../utils/constants';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginStatus = useSelector(getUserStatusSelector);
  const errorText = useSelector(getUserErrorSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      loading={loginStatus === RequestStatus.loading}
    />
  );
};
