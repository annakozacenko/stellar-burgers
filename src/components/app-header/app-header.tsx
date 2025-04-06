import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userNameSelector } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(userNameSelector);
  return <AppHeaderUI userName={user} />;
};
