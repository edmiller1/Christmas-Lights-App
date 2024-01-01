import snowman from "../../../../../../assets/Snowman.png";

export const NoHistory = () => {
  return (
    <>
      <div className="min-h-[65vh] flex flex-col justify-center items-center space-y-5 text-center">
        <img src={snowman} alt="snowman" className="w-24" />
        <h2 className="text-2xl font-semibold">No History Available</h2>
      </div>
    </>
  );
};
