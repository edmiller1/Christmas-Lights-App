import { Link } from "react-router-dom";
import tree from "../../assets/ChristmasLights-Tree-Logo.png";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <img src={tree} alt="christmas tree" className="h-40 w-40" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight">Not Found</h1>
      <p className="mt-6 text-base leading-7 mx-10 text-center sm:mx-3">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-10">
        <Link
          to="/home"
          className="underline text-ch-red hover:text-ch-red-hover"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};
