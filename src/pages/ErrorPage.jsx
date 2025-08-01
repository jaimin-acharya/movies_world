import { NavLink, useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // navigate("/");
    navigate(-1);
  };
  return (
    <div className="flex justify-center items-center flex-col w-full h-full bg-auto">
      <h2 className="text-2xl sm:text-4xl mb-10">Page You're Looking For Does't Exist</h2>
      <NavLink to="/">
        <div>
          <figure>
            <img
              src="https://cdn.dribbble.com/userupload/25055627/file/original-e4438f2e276381c9069a947905270b5c.gif"
              alt="404 page"
              className="rounded-lg"
            />
          </figure>
        </div>
      </NavLink>
      <div className="flex gap-5 mt-10">
        <NavLink to="/">
          <button className=" bg-dark-100 p-3 shadow-inner shadow-light-100/10 font-bold rounded-lg text-white cursor-pointer">
            Go to Home Page
          </button>
        </NavLink>

        <button
          className=" bg-[#D6C7FF] shadow-inner shadow-light-100/10 p-3 font-bold rounded-lg text-black cursor-pointer"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
