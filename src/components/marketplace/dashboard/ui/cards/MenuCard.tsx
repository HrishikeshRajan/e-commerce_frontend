import { faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MenuCard() {
  return (
    <div className="w-52 h-20 rounded bg-green-100 shadow-md">
      <div>
        <FontAwesomeIcon icon={faStore} />
        <h1>Manage Shops</h1>
      </div>

    </div>
  );
}

export default MenuCard;
