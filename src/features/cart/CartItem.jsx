import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdatingItemQuantity from './UpdatingItemQuantity';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3  sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-2 sm:text-xl">
        {quantity}&times; {name}
      </p>
      <div className="flex  items-center justify-between sm:text-lg ">
        <p className="text-sm font-bold sm:ml-auto sm:mr-5 sm:text-lg">
          {formatCurrency(totalPrice)}
        </p>
        <UpdatingItemQuantity pizzaId={pizzaId} currentQuantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
