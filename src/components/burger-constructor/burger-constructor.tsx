import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  createOrder,
  getOrderSelector,
  getOrderStatusSelector,
  orderActions
} from '../../services/slices/orderSlice';
import { RequestStatus } from '../../utils/constants';
import {
  burgerConstructorActions,
  getBurgerConstructorSelector
} from '../../services/slices/burgerConstructorSlice';
import { getUserSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getBurgerConstructorSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest =
    useSelector(getOrderStatusSelector) === RequestStatus.loading;

  const orderModalData = useSelector(getOrderSelector);
  const user = useSelector(getUserSelector);

  const onOrderClick = async () => {
    if (!user) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(
      await createOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(orderActions.reset());
    dispatch(burgerConstructorActions.reset());
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
