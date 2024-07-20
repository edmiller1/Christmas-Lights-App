import { useQuery } from "@apollo/client";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, SEO } from "@/components";
import {
  EmptyState,
  FavouriteDecorationCard,
  YourDecorationsLoading,
} from "../../components";
import penguin from "../../../../assets/Penguin.png";
import { GET_USER_FAVOURITES } from "@/graphql/queries";
import { GetUserFavourites as GetUserFavouritesData } from "@/graphql/queries/getUserFavourites/types";
import { useToast } from "@/components/ui/use-toast";

export const Favourites = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    data: getUserFavouritesData,
    loading: getUserFavouritesLoading,
    refetch: refetchUserFavourites,
  } = useQuery<GetUserFavouritesData>(GET_USER_FAVOURITES, {
    onError: (err) => {
      toast({
        title: "UH oh! 😬",
        description: "Failed to get favourites, try refreshing the page.",
        variant: "destructive",
      });
      console.log(err);
    },
  });

  const userFavourites = getUserFavouritesData?.getUserFavourites.favourites;

  const user = {
    id: getUserFavouritesData?.getUserFavourites.id,
    name: getUserFavouritesData?.getUserFavourites.name,
  };

  const refetchFavourites = () => {
    refetchUserFavourites();
  };

  if (getUserFavouritesLoading) {
    return <YourDecorationsLoading />;
  }

  return (
    <>
      <SEO
        description={`${user.name} - Favourites`}
        name={`${user.name} - Favourites`}
        title={`${user.name} - Favourites`}
        type="Favourites"
      />
      <div className="min-h-screen px-8 py-5 sm:hidden">
        <div className="flex items-center space-x-3">
          <div role="button" onClick={() => navigate(-1)}>
            <CaretLeft size={24} weight="bold" />
          </div>
          <h2 className="text-2xl font-bold">Favourites</h2>
        </div>
        {userFavourites && userFavourites.length > 0 ? (
          <div className="grid grid-cols-1 my-8 gap-x-6 gap-y-10">
            {userFavourites.map((decoration, index) => (
              <FavouriteDecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={userFavourites!}
                index={index}
                refetchfavourites={refetchFavourites}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            image={penguin}
            description="You haven't liked any decorations yet."
          />
        )}
      </div>

      {/* Desktop */}
      <div className="hidden sm:mx-24 sm:block sm:min-h-screen sm:py-24">
        <Breadcrumbs firstWord="Profile" secondWord="Favourites" />
        <h1 className="text-4xl font-bold mt-7">Favourites</h1>
        {userFavourites && userFavourites.length > 0 ? (
          <div className="grid grid-cols-4 my-8 gap-x-6 gap-y-8">
            {userFavourites.map((decoration, index) => (
              <FavouriteDecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={userFavourites!}
                index={index}
                refetchfavourites={refetchFavourites}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            description="You haven't liked any decorations yet."
            image={penguin}
          />
        )}
      </div>
    </>
  );
};
