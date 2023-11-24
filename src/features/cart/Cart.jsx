import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import EmptyCart from '../../features/cart/EmptyCart';
import CartItem from './CartItem';
import { BsCart4 } from 'react-icons/bs';
import { clearCart, getCart, getUserName } from './cartSlice';

function Cart() {
  const username = useSelector(getUserName);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mx-8 my-4 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-8 space-x-4">
        <Button type="small" to="/order/new">
          Order pizzas
        </Button>
        <Button
          onClick={() => {
            dispatch(clearCart());
          }}
          type="secondary"
        >
          <span className="flex items-center">
            Clear.. <BsCart4 />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Cart;
