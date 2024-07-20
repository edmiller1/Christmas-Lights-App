export const VerifyDecorationLoading = () => {
  return (
    <>
      {/* Mobile */}
      <div className="min-h-screen sm:hidden">
        <div className="w-full pt-2">
          <div className="px-2 border-b-2 h-14 dark:border-black">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse dark:bg-zinc-700"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center mx-5 mt-8 space-y-3">
          <div className="h-8 bg-gray-200 rounded-lg dark:bg-zinc-700 animate-pulse"></div>
          <div className="h-24 bg-gray-200 rounded-lg dark:bg-zinc-700 animate-pulse"></div>
          <div className="h-16 bg-gray-200 rounded-lg dark:bg-zinc-700 animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded-lg dark:bg-zinc-700 animate-pulse"></div>
          <div className="bg-gray-200 rounded-lg h-52 dark:bg-zinc-700 animate-pulse"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center w-full">
          <div className="w-full h-16 mx-5 my-5 bg-gray-200 rounded-lg animate-pulse dark:bg-zinc-700"></div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:min-h-screen">
        <div className="w-full pt-2">
          <div className="px-2 border-b-2 h-14 dark:border-black">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse dark:bg-zinc-700"></div>
          </div>
        </div>
        <div className="flex items-center py-24 space-x-40 sm:mx-3 md:mx-5 lg:mx-32 xl:mx-64 2xl:mx-96">
          <div className="w-1/2">
            <div className="h-8 my-5 bg-gray-200 rounded-lg dark:bg-zinc-700 animate-pulse"></div>
            <div className="h-24 my-5 bg-gray-200 rounded-lg dark:bg-zinc-700 animate-pulse"></div>
            <div className="h-24 my-5 bg-gray-200 rounded-lg dark:bg-zinc-700 animate-pulse"></div>
            <div className="my-5 bg-gray-200 rounded-lg h-52 dark:bg-zinc-700 animate-pulse"></div>
          </div>
          <div className="w-1/3">
            <div className="h-64 bg-gray-200 rounded-lg dark:bg-zinc-700 animate-pulse"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 my-5 mx-96">
          <div className="float-right w-20 h-10 bg-gray-200 rounded-lg dark:bg-zinc-700 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};
