import useClearShop from '@/hooks/user/useClearShop';
import AddForm from '../../ui/forms/AddForm';

function CreateShop() {
  useClearShop();

  return (
    <AddForm />
  );
}

export default CreateShop;
