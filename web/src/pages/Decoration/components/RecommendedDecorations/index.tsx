import { Get_Recommended_Decorations } from "@/graphql/queries/getRecommendedDecorations/types";
import { ApolloError } from "@apollo/client";
import { Star, Warning } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { RecommendedDecorationsLoading } from "..";

interface Props {
  recommendedDecorations: Get_Recommended_Decorations[] | undefined;
  getRecommendeddecorationsLoading: boolean;
}

export const RecommendedDecorations = ({
  recommendedDecorations,
  getRecommendeddecorationsLoading,
}: Props) => {
  if (getRecommendeddecorationsLoading) {
    return <RecommendedDecorationsLoading />;
  }

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden px-5 mt-8 h-96">
        <h2 className="text-xl">Other decorations you might like</h2>
        {recommendedDecorations && recommendedDecorations.length > 0 ? (
          <div className="mt-2 flex items-center overflow-y-auto">
            {recommendedDecorations.map((decoration) => (
              <Link to={`/decoration/${decoration.id}`}>
                <div className="group">
                  <div className="w-full h-1/5 rounded-lg">
                    <img
                      src={decoration.images[0].url}
                      alt="decoration image"
                      className="h-52 rounded-lg w-full object-cover object-center group-hover:opacity-90 transition-all"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs font-bold">{decoration.name}</p>
                    <div className="flex items-center space-x-1">
                      <Star
                        size={16}
                        className="text-ch-dark dark:text-ch-light"
                      />
                      <span className="text-xs">{decoration.rating}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs">
                    {decoration.city}, {decoration.country}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-2 flex flex-col items-center justify-center">
            <Warning size={32} className="text-ch-dark dark:text-ch-light" />
            <p>An error occurred when retrieving recommended decorations</p>
          </div>
        )}
      </div>
      {/* Desktop */}
      <div className="hidden sm:block sm:my-10">
        <h3 className="text-2xl font-bold">Other decorations you might like</h3>
        {recommendedDecorations && recommendedDecorations.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 mt-5">
            {recommendedDecorations.map((decoration) => (
              <Link to={`/decoration/${decoration.id}`} key={decoration.id}>
                <div className="group">
                  <div className="w-full h-3/5 overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={decoration.images[0].url}
                      alt="decoration image"
                      className="h-64 w-full object-cover object-center group-hover:opacity-90 transition-all"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="mt-1 font-bold">{decoration.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star
                        size={16}
                        className="text-ch-dark dark:text-ch-light"
                      />
                      <span className="">{decoration.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    {decoration.city}, {decoration.country}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center text-red-700 mx-72 p-5 rounded-lg text-lg text-center">
            <Warning size={40} className="text-ch-dark dark:text-red-700" />
            <p>An error occurred when retrieving recommended decorations</p>
          </div>
        )}
      </div>
    </>
  );
};
