import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { CiPizza } from 'react-icons/ci';
import { deleteItem } from './cartSlice';

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(deleteItem(pizzaId));
      }}
      type="small"
    >
      <span className="flex items-center">
        Remove-
        <CiPizza />
      </span>
    </Button>
  );
}
