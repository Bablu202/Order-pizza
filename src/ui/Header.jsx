import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

export default function Header() {
  return (
    <header
      className="flex items-center justify-between border-b
     border-stone-400 bg-yellow-400 p-3 uppercase sm:px-6"
    >
      <Link to="/">Pizza Co & U</Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
