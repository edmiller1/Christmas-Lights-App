export const TableLoading = () => {
  return (
    <>
      <div className="mt-10 sm:hidden">
        <div className="animate-pulse h-24 rounded-lg bg-gray-200 dark:bg-zinc-700"></div>
      </div>

      <div className="hidden sm:block sm:mt-14">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse rounded-lg h-32 w-full bg-gray-200 dark:bg-zinc-700"></div>
        </div>
      </div>
    </>
  );
};
