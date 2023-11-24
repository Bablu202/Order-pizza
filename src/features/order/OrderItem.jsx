import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-base">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="mr-10 font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-400">
        {isLoadingIngredients ? 'loading...' : ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
