import reindeer from "../../../../../../assets/Reindeer.png";

export const NoFavourites = () => {
  return (
    <>
      <div className="min-h-[65vh] flex flex-col justify-center items-center space-y-5 text-center">
        <img src={reindeer} alt="reindeer" className="w-24" />
        <h2 className="text-2xl font-semibold">
          You haven't liked any decorations yet.
        </h2>
      </div>
    </>
  );
};
