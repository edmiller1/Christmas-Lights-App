export const DecorationLoading = () => {
  return (
    <>
      <div className="min-h-screen sm:hidden">
        <div className="h-64 w-full animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="my-5 mx-3">
          <div className="h-10 w-5/6 my-3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-5 w-full my-3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-5 w-full my-3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        </div>
        <div className="h-[1px] w-full"></div>
        <div className="my-5 mx-3">
          <div className="h-5 w-full my-3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-5 w-3/4 my-3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        </div>
        <div className="h-[1px] w-full"></div>
        <div className="my-5 mx-3">
          <div className="h-32 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="h-2 w-2/3 rounded-lg my-3 animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block min-h-screen">
        <div className="mx-96 pt-32">
          <div className="h-10 w-1/2 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          <div className="flex items-center justify-between">
            <div className="h-5 my-5 w-1/3 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            <div className="h-8 w-32 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          </div>
          <div className="flex items-center mt-10">
            <div className="h-[28rem] bg-gray-200 animate-pulse rounded-tl-lg rounded-bl-lg w-1/2 mb-4 mr-1 dark:bg-zinc-700"></div>
            <div className="h-[28rem] grid grid-cols-2 gap-2 rounded-lg w-1/2 mb-4 ml-1">
              <div className="animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
              <div className="animate-pulse bg-gray-200 rounded-tr-lg dark:bg-zinc-700"></div>
              <div className="animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
              <div className="animate-pulse bg-gray-200 rounded-br-lg dark:bg-zinc-700"></div>
            </div>
          </div>
          <div className="mt-5 mx-2">
            <div className="w-2/3 flex items-center">
              <div className="h-8 w-1/3 bg-gray-200 rounded-lg mb-4 mr-1 animate-pulse dark:bg-zinc-700"></div>
              <div className="-mt-4 ml-3 h-10 w-10 rounded-full animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
