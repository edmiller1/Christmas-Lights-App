export const DecorationCardLoading = () => {
  return (
    <>
      <div className="group sm:hidden">
        <div className="w-full h-60 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="h-5 w-1/2 my-2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="w-3/4 h-5 my-2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
      </div>

      <div className="hidden sm:block">
        <div className="w-full h-64 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="h-5 w-1/2 my-2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="w-3/4 h-5 my-2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
      </div>
    </>
  );
};
