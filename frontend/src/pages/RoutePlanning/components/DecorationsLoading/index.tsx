export const DecorationsLoading = () => {
  return (
    <>
      <div className="sm:hidden">
        <div className="mt-5 h-64 rounded-lg w-full p-2 animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
      </div>

      <div className="hidden sm:block">
        <div className="mt-44 grid grid-cols-1 gap-y-5 p-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-28 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};
