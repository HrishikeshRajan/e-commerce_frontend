import { ShopCore } from '@/types/Product';
import ListItem from './ListItem';

function ShopDetails({ shop }:{ shop:ShopCore }) {
  return (
    <ul>
      <ListItem name="Name">
        {shop.name}
      </ListItem>
      <ListItem name="email">
        {shop.email}
      </ListItem>
      <ListItem name="address">
        {shop.address}
      </ListItem>
    </ul>
  );
}

export default ShopDetails;
