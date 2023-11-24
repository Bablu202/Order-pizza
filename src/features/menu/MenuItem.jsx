/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { BsCart4 } from 'react-icons/bs';
import { CiPizza } from 'react-icons/ci';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdatingItemQuantity from '../cart/UpdatingItemQuantity';
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className=" flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? 'opacity-60 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col">
        <p className="font-sans text-base font-medium">{name}</p>
        <p className="font-mono text-sm capitalize text-yellow-700">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto  flex  items-center  justify-between  text-sm">
          {!soldOut ? (
            <p className=" font-semibold">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className=" text-stone-400">Sold out</p>
          )}

          {isInCart && (
            <>
              <UpdatingItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              <span className="flex  items-center">
                add <CiPizza /> to ..
                <BsCart4 className="text-yellow-700" />
              </span>
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
