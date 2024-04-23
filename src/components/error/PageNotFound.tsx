import notFound from '../../assets/404.jpg';

function PageNotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white text-center">
      <img src={notFound} alt="not found" />
    </div>
  );
}

export default PageNotFound;
