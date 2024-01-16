export const DecorationsLoading = () => {
  return (
    <>
      <div className="sm:hidden"></div>

      <div className="hidden sm:block mt-44">
        <div className="grid grid-cols-1 gap-y-5 p-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="w-full h-28 rounded-lg animate-pulse bg-gray-200 dark:bg-zinc-700"></div>
          ))}
        </div>
      </div>
    </>
  );
};
