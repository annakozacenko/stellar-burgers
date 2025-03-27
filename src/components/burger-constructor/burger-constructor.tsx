import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import {
  clearOrder,
  makeOrder,
  orderIsLoadingSelector,
  orderSelector
} from '../../slices/orderSlice';
import {
  clearBurgerConstructor,
  constructorItemsSelector
} from '../../slices/constructorSlice';
import {
  userIsAuthenticatedSelector,
  userSelector
} from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(constructorItemsSelector);
  const orderRequest = useSelector(orderIsLoadingSelector);
  const orderModalData = useSelector(orderSelector);
  const user = useSelector(userSelector);

  const { bun, ingredients } = constructorItems;
  const orderData: string[] = bun
    ? [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id]
    : [];

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(makeOrder(orderData));
  };
  const closeOrderModal = () => {
    dispatch(clearBurgerConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
