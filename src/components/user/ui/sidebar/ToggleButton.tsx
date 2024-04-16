import { useTypedDispatch, useTypedSelector } from '@/hooks/user/reduxHooks';
import { toggleUserSidebar } from '@/utils/reduxSlice/appSlice';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ToggleButton() {
  const dispatch = useTypedDispatch();
  const isOpen = useTypedSelector((store) => store.app.sidebar);

  // Button will be visible when isopen state is true
  return (
    <button onClick={() => dispatch(toggleUserSidebar())} type="button" className={`${isOpen ? 'absolute' : 'hidden'} mb-10 m-2 ms-1 z-50 text-sm text-white rounded-lg md:hidden active:scale-105 ml-20 hover:bg-gray-100 `}>
      <span className="sr-only">Open sidebar</span>
      <FontAwesomeIcon icon={faXmark} size="3x" />
    </button>
  );
}

export default ToggleButton;
