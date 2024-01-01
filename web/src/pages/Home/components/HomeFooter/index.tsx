import { Link } from "react-router-dom";

export const HomeFooter = () => {
  return (
    <footer className="hidden sm:block sm:fixed sm:h-16 sm:bottom-0 sm:left-0 sm:right-0 sm:z-10 sm:dark:bg-zinc-900 sm:border-t sm:dark:border-black">
      <div className="flex items-center py-5 px-10">
        <span className="px-3 text-sm">&copy; Christmas Lights App</span>

        <span>&middot;</span>
        <Link to="/home">
          <span className="px-3 text-sm hover:underline">Privacy</span>
        </Link>
        <span>&middot;</span>
        <Link to="/home">
          <span className="px-3 text-sm hover:underline">Terms</span>
        </Link>
        <span>&middot;</span>
        <Link to="/home">
          <span className="px-3 text-sm hover:underline">Sitemap</span>
        </Link>
      </div>
    </footer>
  );
};
