import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increateItemQuantity } from './cartSlice';

export default function UpdatingItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="ml-auto flex items-center justify-center gap-2 md:gap-4">
      <Button
        onClick={() => {
          dispatch(decreaseItemQuantity(pizzaId));
        }}
        type="count"
      >
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button
        type="count"
        onClick={() => {
          dispatch(increateItemQuantity(pizzaId));
        }}
      >
        +
      </Button>
    </div>
  );
}
