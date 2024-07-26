import { useQuery } from "@apollo/client";
import { GET_DECORATIONS_BY_RATING } from "@/graphql/queries";
import { GetDecorationsByRating as GetDecorationsByRatingData } from "@/graphql/queries/getDecorationsByRating/types";
import { DecorationsLoading } from "../DecorationsLoading";
import { DecorationCard } from "@/components";
import { Get_User } from "@/graphql/queries/getUser/types";

interface Props {
  currentUser: Get_User | null;
  isAuthenticated: boolean;
  refetchUserData: () => void;
}

export const HighlyRatedDecorations = ({
  currentUser,
  isAuthenticated,
  refetchUserData,
}: Props) => {
  const {
    data: getDecorationsByRatingData,
    loading: getDecorationsByRatingLoading,
  } = useQuery<GetDecorationsByRatingData>(GET_DECORATIONS_BY_RATING);

  const decorationsByRating = getDecorationsByRatingData?.getDecorationsByRating
    ? getDecorationsByRatingData.getDecorationsByRating
    : null;

  if (getDecorationsByRatingLoading) {
    return <DecorationsLoading />;
  }

  return (
    <>
      {decorationsByRating && decorationsByRating?.length > 0 ? (
        <div className="pb-16 mx-6 -mt-24 lg:mx-16">
          <h2 className="mb-10 text-4xl font-bold">User favourites</h2>
          {decorationsByRating?.map((decoration, index) => (
            <>
              <DecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={decorationsByRating}
                index={index}
                isAuthenticated={isAuthenticated}
                refetchUserData={refetchUserData}
                userFavourites={currentUser?.favourites.map(
                  (favourite) => favourite.id
                )}
              />
            </>
          ))}
        </div>
      ) : null}
    </>
  );
};
