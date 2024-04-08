interface Props {
  image: string;
  description: string;
}

export const EmptyState = ({ description, image }: Props) => {
  return (
    <>
      <div className="min-h-[70vh] flex flex-col justify-center items-center space-y-5 text-center">
        <img src={image} alt="penguin" className="w-24" />
        <h2 className="text-2xl font-semibold">{description}</h2>
      </div>
    </>
  );
};
