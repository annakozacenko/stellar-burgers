import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearError,
  registerUser,
  userErrorSelector,
  userLoginRequestSelector
} from '../../slices/userSlice';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerError = useSelector(userErrorSelector) || '';

  const loginUserRequest = useSelector(userLoginRequestSelector);

  const [userName, setUserName] = useState('');
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

    dispatch(
      registerUser({ name: userName, email: email, password: password })
    );
  };

  if (loginUserRequest) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={registerError}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
