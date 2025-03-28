import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearError,
  loginUser,
  userErrorSelector,
  userLoginRequestSelector
} from '../../slices/userSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const loginUserRequest = useSelector(userLoginRequestSelector);
  const loginError = useSelector(userErrorSelector) || '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser({ email: email, password: password }));
  };

  if (loginUserRequest) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={loginError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
