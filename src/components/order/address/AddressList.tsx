import { Address } from '@/types/Orders';
import PrimaryAddressFactory from '../factory/PrimaryAddressFactory';
import AddressCard from './AddressCard';

type AddressListProps = { addressess:Address[] | undefined, setAdd: (add: Address) => void };
function AddressList({ addressess, setAdd }:AddressListProps) {
  if (!addressess || (addressess && addressess.length < 1)) return null;
  return (
    <>
      {addressess
        .map((address:Address) => {
          if (address.isPrimary) {
            return (
              <PrimaryAddressFactory
                key={address._id}
              >
                <AddressCard
                  address={address}
                  setAddress={setAdd}
                />
              </PrimaryAddressFactory>
            );
          }
          return (
            <AddressCard
              address={address}
              key={address._id}
              setAddress={setAdd}
            />
          );
        })}
    </>
  );
}

export default AddressList;
