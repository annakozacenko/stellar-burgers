import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector((state: RootState) => state.user.user?.name);
  return <AppHeaderUI userName={user} />;
};
