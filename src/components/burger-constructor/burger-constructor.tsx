import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '../../services/store';
import { clearOrder, makeOrder } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { clearBurgerConstructor } from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** done-TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (state: RootState) => state.constructorItems
  );

  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const orderRequest = useSelector((state: RootState) => state.order.isLoading);
  // const orderRequest = false;
  // const orderModalData = null;
  const orderModalData = useSelector((state: RootState) => state.order.order);

  const { bun, ingredients } = constructorItems;
  const orderData: string[] = bun
    ? [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id]
    : [];

  const onOrderClick = () => {
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
  // return null;
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
