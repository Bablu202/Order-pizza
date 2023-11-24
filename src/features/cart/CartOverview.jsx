import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
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
     bg-stone-800  p-4 text-sm uppercase
      text-stone-200 sm:px-6 md:text-base"
    >
      <p className="space-x-4 font-semibold  sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
