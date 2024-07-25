import { useQuery } from "@apollo/client";
import { GET_DECORATIONS_BY_CITY } from "@/graphql/queries";
import { GetDecorationsByCity as GetDecorationsByCityData } from "@/graphql/queries/getDecorationsByCity/types";
import { DecorationsLoading } from "../DecorationsLoading";
import { DecorationCard } from "@/components";
import { Get_User } from "@/graphql/queries/getUser/types";
import { Card, CardContent } from "@/components/ui/card";
import { CaretRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface Props {
  currentUser: Get_User | null;
  isAuthenticated: boolean;
  refetchUserData: () => void;
}

export const RelativeDecorations = ({
  currentUser,
  isAuthenticated,
  refetchUserData,
}: Props) => {
  const {
    data: getDecorationsByCityData,
    loading: getDecorationsByCityLoading,
  } = useQuery<GetDecorationsByCityData>(GET_DECORATIONS_BY_CITY);

  const decorationsByCity = getDecorationsByCityData?.getDecorationsByCity
    ? getDecorationsByCityData.getDecorationsByCity
    : null;

  if (getDecorationsByCityLoading) {
    return <DecorationsLoading />;
  }

  return (
    <>
      {decorationsByCity && decorationsByCity?.length > 0 ? (
        <div className="pb-16 mx-6 -mt-24 lg:mx-16">
          <h2 className="mb-10 text-4xl font-bold">
            Explore nearby decorations
          </h2>
          {decorationsByCity?.map((decoration, index) => (
            <div className="flex items-center space-x-6">
              <DecorationCard
                key={decoration.id}
                currentUser={currentUser}
                decoration={decoration}
                decorations={decorationsByCity}
                index={index}
                isAuthenticated={isAuthenticated}
                refetchUserData={refetchUserData}
                userFavourites={currentUser?.favourites.map(
                  (favourite) => favourite.id
                )}
              />
              <div className="cursor-pointer">
                <Card className="flex items-end w-64 h-64 -mt-12 cursor-pointer">
                  <CardContent className="w-full text-xl hover:underline">
                    <Link
                      to={`/explore?query=${decoration.city}`}
                      className="flex items-center "
                    >
                      Explore more <CaretRight />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};
