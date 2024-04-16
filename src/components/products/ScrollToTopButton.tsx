import { FaArrowUp } from 'react-icons/fa';

function ScrollToTopButton() {
  const moveToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button type="button" onClick={moveToTop} className="absolute right-0  mr-10  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 hover:scale-105 active:scale-105  focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <FaArrowUp />
      <span className="sr-only">Icon description</span>
    </button>
  );
}

export default ScrollToTopButton;
