import { Link } from 'react-router-dom';
import notFound from '../../assets/404.jpg';

function ProductNotFoundError() {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-full text-black relative flex justify-center flex-col items-center">
        <img src={notFound} alt="NOT FOUND" className="xl:w-96 w-auto" />
        <Link className="text-xs" to="https://www.freepik.com/free-vector/404-concept-with-desert_1534907.htm#query=404%20page&position=3&from_view=keyword&track=ais&uuid=d4672215-ad68-467b-90ce-19b186d058ef">Freepik</Link>

      </div>
    </div>
  );
}

export default ProductNotFoundError;
