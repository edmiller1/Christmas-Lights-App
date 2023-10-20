export const DecorationLoading = () => {
  return (
    <div className="min-h-screen">
      <div className="h-64 w-full bg-zinc-700 animate-pulse"></div>
      <div className="my-5 mx-3">
        <div className="h-10 w-5/6 my-3 bg-zinc-700 rounded-lg animate-pulse"></div>
        <div className="h-5 w-full my-3 bg-zinc-700 rounded-lg animate-pulse"></div>
        <div className="h-5 w-full my-3 bg-zinc-700 rounded-lg animate-pulse"></div>
      </div>
      <div className="h-[1px] w-full bg-zinc-700"></div>
      <div className="my-5 mx-3">
        <div className="h-5 w-full my-3 bg-zinc-700 rounded-lg animate-pulse"></div>
        <div className="h-5 w-3/4 my-3 bg-zinc-700 rounded-lg animate-pulse"></div>
      </div>
      <div className="h-[1px] w-full bg-zinc-700"></div>
    </div>
  );
};
