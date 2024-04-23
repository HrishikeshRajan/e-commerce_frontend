import { useNavigate } from 'react-router-dom';
import notFound from '../../assets/404.jpg';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center  gap-2 bg-white text-center">
      <img src={notFound} alt="not found" className="xl:w-96 xl:h-96 xl:rounded-full" />
      <button type="button" onClick={() => navigate(-1)} className="p-2 bg-yellow-300 rounded-xl font-semibold ">Go back</button>
    </div>
  );
}

export default PageNotFound;
