import Button from '../../ui/Button';

function EmptyCart() {
  return (
    <div className="flex flex-col  p-10 text-center text-lg">
      <p className="mb-10  text-lg">
        Your cart is still empty. Start adding some pizzas :)
      </p>
      <Button type="primary" to="/menu">
        &larr; Back to menu and order some Pizza
      </Button>
    </div>
  );
}

export default EmptyCart;
