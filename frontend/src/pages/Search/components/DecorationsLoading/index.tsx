export const DecorationsLoading = () => {
  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden overflow-y-auto">
        <div className="mx-5 grid grid-cols-1 gap-y-5">
          {Array.from({ length: 2 }).map((item: any) => (
            <div
              key={item}
              className="w-full h-80 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"
            ></div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="py-3 mt-5 grid grid-cols-3 gap-x-6 gap-y-10">
          {Array.from({ length: 18 }).map((item: any) => (
            <div
              key={item}
              className="w-80 h-80 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};
