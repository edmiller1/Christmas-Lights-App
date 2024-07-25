import { DecorationCardLoading } from "@/components";

export const DecorationsLoading = () => {
  return (
    <>
      <div className="px-6 py-16 sm:hidden">
        <div className="grid grid-cols-1 my-8 gap-x-6 gap-y-10">
          {Array.from([1, 2, 3]).map((item) => (
            <DecorationCardLoading key={item} />
          ))}
        </div>
      </div>

      <div className="hidden min-h-screen sm:block">
        <div className="w-1/3 h-16 mx-16 mb-8 bg-gray-200 rounded-lg animate-pulse dark:bg-zinc-700"></div>
        <div className="grid grid-cols-5 px-16 gap-x-6 gap-y-10">
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((item) => (
            <DecorationCardLoading key={item} />
          ))}
        </div>
      </div>
    </>
  );
};
