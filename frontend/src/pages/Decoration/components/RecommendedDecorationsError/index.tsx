import { Warning } from "@phosphor-icons/react";

export const RecommendedDecorationsError = () => {
  return (
    <>
      <div className="sm:hidden h-full mt-5 p-3 rounded-lg flex flex-col items-center justify-center text-center border-primary border-2 text-primary">
        <Warning size={32} className="text-primary" />
        <p>An error occurred when retrieving recommended decorations</p>
      </div>

      <div className="hidden mt-10 sm:flex flex-col justify-center items-center text-red-700 border-2 p-8 rounded-lg border-primary">
        <Warning size={40} />
        <p>An error occurred when retrieving recommended decorations</p>
      </div>
    </>
  );
};
