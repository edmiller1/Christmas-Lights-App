import { Link } from "react-router-dom";
import logo from "../../assets/ChristmasLights-House-Logo.png";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <Link to="/">
            <img src={logo} alt="Christmas Lights Logo" className="h-8 me-3" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Christmas Lights App
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Resources
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="/">Something</Link>
              </li>
              <li>
                <Link to="/">Something</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Follow
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="/">Something</Link>
              </li>
              <li>
                <Link to="/">Something</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    </footer>
  );
};
