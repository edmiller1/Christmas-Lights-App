import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { SEO } from "@/components";

export const SiteMap = () => {
  return (
    <>
      <SEO
        description="SiteMap for Christmas Lights App"
        name="SiteMap"
        title="SiteMap"
        type="SiteMap"
      />
      <div className="mx-5 my-3 md:mx-72">
        <Link to="/">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        <div className="mt-16">
          <h1 className="font-semibold text-2xl">Pages</h1>
          <div className="mt-5 flex flex-col space-y-3 md:grid md:grid-cols-3 md:gap-x-8 lg:grid lg:grid-cols-4">
            <Link to="/">
              <span className="underline">Landing Page</span>
            </Link>
            <Link to="/">
              <span className="underline">Home</span>
            </Link>
            <Link to="/signup">
              <span className="underline">Sign Up</span>
            </Link>
            <Link to="/signin">
              <span className="underline">Sign In</span>
            </Link>
            <Link to="/decoration/cluj3sswi0005o5gk5mjlx3pj">
              <span className="underline">Decoration Example</span>
            </Link>
            <Link to="/route-planning">
              <span className="underline">Route Planning</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
