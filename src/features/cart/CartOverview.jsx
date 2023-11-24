import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { BsCart4 } from 'react-icons/bs';

function CartOverview() {
  /* const totalCartQuantity = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalCartPrice = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.unitPrice, 0),
  );*/
  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalCartQuantity = useSelector(getTotalCartQuantity);

  if (!totalCartQuantity) return;
  return (
    <div
      className="flex items-center justify-between  
     border border-yellow-500 bg-stone-600 p-4 pb-6 text-sm
      uppercase text-stone-100 sm:px-6 md:text-base"
    >
      <p className="space-x-4 font-semibold  sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="cart" className="mr-10 rounded-xl bg-green-600 p-1.5">
        <span className="flex items-center">
          Open cart &rarr;
          <BsCart4 />
        </span>
      </Link>
    </div>
  );
}

export default CartOverview;
