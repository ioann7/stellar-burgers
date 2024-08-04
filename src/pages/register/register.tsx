import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserErrorSelector,
  getUserStatusSelector,
  registerUser
} from '../../services/slices/userSlice';
import { RequestStatus } from '../../utils/constants';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerStatus = useSelector(getUserStatusSelector);
  const errorMessage = useSelector(getUserErrorSelector);

  const dispath = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispath(registerUser({ email, name: userName, password }));
  };

  return (
    <RegisterUI
      errorText={errorMessage}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
      loading={registerStatus === RequestStatus.loading}
    />
  );
};
