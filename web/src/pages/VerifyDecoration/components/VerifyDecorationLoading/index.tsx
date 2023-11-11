import { Separator } from "@/components/ui/separator";

export const VerifyDecorationLoading = () => {
  return (
    <>
      {/* Mobile */}
      <div className="min-h-screen sm:hidden">
        <div className="w-full pt-2">
          <div className="h-14 px-2 border-b-2 dark:border-black">
            <div className="h-12 w-12 rounded-full animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center mx-5 space-y-3">
          <div className="h-8 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
          <div className="h-24 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
          <div className="h-16 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
          <div className="h-20 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
          <div className="h-52 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
        </div>
        <div className="absolute w-full bottom-0 left-0 right-0 flex justify-center items-center">
          <div className="w-full h-16 mx-5 my-5 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:min-h-screen">
        <div className="w-full pt-2">
          <div className="h-14 px-2 border-b-2 dark:border-black">
            <div className="h-12 w-12 rounded-full animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          </div>
        </div>
        <div className="flex items-center space-x-40 mx-96 my-24">
          <div className="w-1/2">
            <div className="my-5 h-8 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
            <div className="my-5 h-24 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
            <div className="my-5 h-24 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
            <div className="my-5 h-52 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
          </div>
          <div className="w-1/3">
            <div className="h-64 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
          </div>
        </div>
        <div className="mx-96 absolute my-5 bottom-0 left-0 right-0">
          <div className="float-right w-20 h-10 rounded-lg bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};
