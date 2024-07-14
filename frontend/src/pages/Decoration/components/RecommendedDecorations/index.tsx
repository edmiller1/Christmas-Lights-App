import { Get_Recommended_Decorations } from "@/graphql/queries/getRecommendedDecorations/types";
import { Star } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { RecommendedDecorationsError, RecommendedDecorationsLoading } from "..";
import { ApolloError } from "@apollo/client";

interface Props {
  recommendedDecorations: Get_Recommended_Decorations[] | undefined;
  getRecommendeddecorationsLoading: boolean;
  getRecommendedDecorationsError: ApolloError | undefined;
}

export const RecommendedDecorations = ({
  recommendedDecorations,
  getRecommendeddecorationsLoading,
  getRecommendedDecorationsError,
}: Props) => {
  if (getRecommendeddecorationsLoading) {
    return <RecommendedDecorationsLoading />;
  }

  if (getRecommendedDecorationsError) {
    return <RecommendedDecorationsError />;
  }

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden px-5 mt-5">
        {recommendedDecorations && recommendedDecorations.length > 0 ? (
          <>
            <h2 className="text-xl">Other decorations you might like</h2>
            <div className="my-3 grid grid-cols-1 gap-y-6 mb-24">
              {recommendedDecorations.map((decoration) => (
                <Link to={`/decoration/${decoration.id}`}>
                  <div className="group">
                    <div className="w-full h-1/5 rounded-xl">
                      <img
                        src={decoration.images[0].url}
                        alt="decoration image"
                        className="h-72 w-full rounded-lg object-cover object-center group-hover:opacity-90 transition-all"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold">{decoration.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star
                          size={16}
                          weight="fill"
                          className="text-ch-dark dark:text-ch-light"
                        />
                        <span className="text-sm">
                          {decoration.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 dark:text-zinc-400">
                      {decoration.city}, {decoration.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </div>

      {/* Desktop */}
      <div className="hidden sm:block w-full sm:mt-32 mb-24">
        {recommendedDecorations && recommendedDecorations.length > 0 ? (
          <>
            <h3 className="text-2xl font-bold">
              Other decorations you might like
            </h3>
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
          </>
        ) : null}
      </div>
    </>
  );
};
