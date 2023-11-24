import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import store from '../../store';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
} from '../cart/cartSlice';
import EmptyCart from '../../features/cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';
import { TfiLocationPin } from 'react-icons/tfi';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const totalCartPrice = useSelector(getTotalCartPrice);
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  if (cart.length < 0) return <EmptyCart />;
  return (
    <div className="px-4 py-6 text-lg ">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5  sm:flex sm:items-center">
          <label className="w-40">First Name</label>
          <div>
            <input
              className="input w-80 "
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className="mb-5  sm:flex sm:w-full sm:items-center ">
          <label className="w-40">Phone number</label>
          <div>
            <input type="tel" name="phone" required className="input w-80 " />
            {formErrors?.phone && (
              <p className=" mx-5 mt-2 w-max rounded-md bg-red-100 p-1 text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex-wrap  sm:flex sm:items-center">
          <label className="mr-5 ">Address</label>

          {!position.latitude && !position.longitude && (
            <Button
              disabled={isLoadingAddress}
              type="primary"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              <span className="flex w-40 flex-row items-center justify-center">
                <p>get location..</p>
                <TfiLocationPin />
              </span>
            </Button>
          )}
          <div>
            <textarea
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              className="input w-80"
            />
            {addressStatus === 'error' && (
              <p className=" mx-5 mt-2 w-max rounded-md bg-red-100 p-1 text-xs text-red-600">
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="m-2 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring 
            focus:ring-yellow-400 focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitudes}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order ...'
              : `Order now for - ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'provide us proper contact number, to contact you';
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
