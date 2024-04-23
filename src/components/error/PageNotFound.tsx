import notFound from '../../assets/404.jpg';

function PageNotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center  bg-white text-center">
      <img src={notFound} alt="not found" className="xl:w-96 xl:h-96 xl:rounded-full" />
    </div>
  );
}

export default PageNotFound;
