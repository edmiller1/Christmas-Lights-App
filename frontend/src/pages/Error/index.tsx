import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">Uh Oh!</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-zinc-400">
          It looks like an error occurred. Please refresh the page and try
          again.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button>
            <a href="https://forms.gle/PiVwU8agfDNAh6WP6" target="_blank">
              Report error
            </a>
          </Button>
          <Link to="/">
            <Button variant="secondary">Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};
