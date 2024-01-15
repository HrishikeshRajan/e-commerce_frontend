import { useEffect } from 'react';

type SetQuerypage = React.Dispatch<React.SetStateAction<{
  page: number;
  category: string | undefined;
}>>;
const useIncrementPageOnScroll = (setQueryObj:SetQuerypage, page:number) => {
  useEffect(() => {
    setQueryObj((prevQueryObj) => ({ ...prevQueryObj, page }));
  }, [page, setQueryObj]);
};

export default useIncrementPageOnScroll;
