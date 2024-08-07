export const ProfileLoading = () => {
  return (
    <>
      <div className="px-8 py-10 min-h-screen sm:hidden">
        <div className="h-8 w-1/3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="my-5 flex items-center space-x-5">
          <div className="h-20 w-20 rounded-full animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-8 w-1/3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        </div>
        <div className="h-32 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="my-10">
          <div className="my-5 h-16 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="my-5 h-16 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="my-5 h-16 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="my-5 h-16 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        </div>
      </div>

      <div className="sm:mx-5 md:mx-12 lg:mx-24 xl:mx-28 2xl:mx-96 py-24 sm:min-h-screen">
        <div className="h-10 w-1/3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="mt-5 h-5 w-1/2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10">
          <div className="h-24 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-24 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-24 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-24 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-24 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-24 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        </div>
      </div>
    </>
  );
};
