import { DecorationCardLoading } from "@/components";

export const DecorationsLoading = () => {
  return (
    <>
      <div className="px-6 py-16 sm:hidden">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 my-8">
          {Array.from([1, 2, 3]).map((item) => (
            <DecorationCardLoading key={item} />
          ))}
        </div>
      </div>

      <div className="hidden sm:block min-h-screen">
        <div className="mt-16 h-screen w-full animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
        <div className="px-16 pt-32 grid grid-cols-6 gap-x-6 gap-y-10">
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).map((item) => (
            <DecorationCardLoading key={item} />
          ))}
        </div>
      </div>
    </>
  );
};
