import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { clearError, loginUser } from '../../slices/userSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const loginUserRequest = useSelector(
    (state: RootState) => state.user.loginUserRequest
  );
  const loginError = useSelector((state: RootState) => state.user.error) || '';
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
