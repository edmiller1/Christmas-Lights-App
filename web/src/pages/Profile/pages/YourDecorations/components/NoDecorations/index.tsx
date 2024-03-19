import penguin from "../../../../../../assets/Penguin.png";

export const NoDecorations = () => {
  return (
    <>
      <div className="min-h-[70vh] flex flex-col justify-center items-center space-y-5 text-center">
        <img src={penguin} alt="penguin" className="w-24" />
        <h2 className="text-2xl font-semibold">
          You have not created any decorations yet.
        </h2>
      </div>
    </>
  );
};
