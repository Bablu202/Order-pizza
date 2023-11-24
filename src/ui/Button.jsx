import { Link } from 'react-router-dom';
export default function Button({ children, disabled, to, type, onClick }) {
  const base =
    ' rounded-full bg-yellow-400   text-stone-800 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ';
  const styles = {
    primary: base + 'px-4 py-2 sm:px-4 sm:py-2',
    small: base + 'px-4 py-1 mr-3  ',
    secondary:
      base +
      'px-4 py-1 mr-3  bg-stone-300  text-stone-900 hover:bg-stone-300 hover:bg-stone-300 focus:ring-stone-300',
    round:
      base +
      'px-2 m-2 bg-stone-300   rounded-none text-stone-900 hover:bg-stone-300 hover:bg-stone-300 focus:ring-stone-300',
  };
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
