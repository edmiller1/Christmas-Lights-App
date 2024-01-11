export const YourDecorationsLoading = () => {
  return (
    <>
      <div className="px-8 py-5 sm:hidden">
        <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="mt-8 h-8 w-2/3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 my-8">
          <div>
            <div className="w-full h-64 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-3 flex items-center justify-between">
              <div className="h-10 w-2/5 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
              <div className="h-10 w-16 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            </div>
            <div className="my-3 h-10 w-3/5 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          </div>
          <div>
            <div className="w-full h-64 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-3 flex items-center justify-between">
              <div className="h-10 w-2/5 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
              <div className="h-10 w-16 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            </div>
            <div className="my-3 h-10 w-3/5 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block sm:mx-96 sm:pt-16 sm:min-h-screen">
        <div className="h-8 mb-5 w-1/4 animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-700"></div>
        <div className="h-8 my-7 w-1/3 animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-700"></div>
        <div className="grid grid-cols-4 gap-x-6 gap-y-8">
          <div>
            <div className="h-64 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-4 h-5 w-1/2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-4 h-5 w-3/4 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          </div>
          <div>
            <div className="h-64 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-4 h-5 w-1/2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-4 h-5 w-3/4 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          </div>
          <div>
            <div className="h-64 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-4 h-5 w-1/2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-4 h-5 w-3/4 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          </div>
          <div>
            <div className="h-64 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-4 h-5 w-1/2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="my-4 h-5 w-3/4 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          </div>
        </div>
      </div>
    </>
  );
};
