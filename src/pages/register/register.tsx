import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { clearError, loginUser, registerUser } from '../../slices/userSlice';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerError =
    useSelector((state: RootState) => state.user.error) || '';

  const loginUserRequest = useSelector(
    (state: RootState) => state.user.loginUserRequest
  );

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
