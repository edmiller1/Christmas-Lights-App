import { Link } from "react-router-dom";
import tree from "../../assets/tree.png";
import { SEO } from "@/components";

export const NotFound = () => {
  return (
    <>
      <SEO
        description="Page Not Found"
        name="Page Not Found"
        title="404 Not Found"
        type="404"
      />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src={tree} alt="christmas tree" className="h-40 w-40" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Not Found</h1>
        <p className="mt-6 text-base leading-7 mx-10 text-center sm:mx-3">
          Whoops! It looks like Santa's elves have accidentally misplaced the
          page you were looking for!
        </p>
        <div className="mt-10">
          <Link to="/" className="underline text-primary">
            Go back home
          </Link>
        </div>
      </div>
    </>
  );
};
