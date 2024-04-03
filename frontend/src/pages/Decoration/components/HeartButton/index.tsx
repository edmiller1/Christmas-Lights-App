import { Get_User } from "@/graphql/queries/getUser/types";
import { CircleNotch, Heart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface Props {
  favouriteDecorationLoading: boolean;
  unfavouriteDecorationLoading: boolean;
  currentUser: Get_User | null;
  decorationId: string | undefined;
  removeFromFavourites: () => void;
  addToFavourites: () => void;
}

export const HeartButton = ({
  addToFavourites,
  currentUser,
  decorationId,
  favouriteDecorationLoading,
  removeFromFavourites,
  unfavouriteDecorationLoading,
}: Props) => {
  return (
    <>
      {favouriteDecorationLoading || unfavouriteDecorationLoading ? (
        <div className="absolute right-3 top-3 px-1 py-1 bg-white rounded-full shadow-lg">
          <CircleNotch
            size={24}
            color="#000000"
            weight="bold"
            className="animate-spin"
          />
        </div>
      ) : (
        <>
          {currentUser ? (
            <>
              {currentUser?.favourites.some(
                (favourite) => favourite.id === decorationId
              ) ? (
                <button
                  role="button"
                  className="absolute right-3 top-3 px-1 py-1 bg-white rounded-full shadow-lg"
                  onClick={() => removeFromFavourites}
                >
                  <Heart size={24} weight="fill" className="text-ch-pink" />
                </button>
              ) : (
                <button
                  role="button"
                  className="absolute right-3 top-3 px-1 py-1 bg-white rounded-full shadow-lg"
                  onClick={addToFavourites}
                >
                  <Heart size={24} color="#000000" weight="bold" />
                </button>
              )}
            </>
          ) : (
            <Link to="/signin">
              <button
                role="button"
                className="absolute right-3 top-3 px-1 py-1 bg-white rounded-full shadow-lg"
              >
                <Heart size={24} color="#000000" weight="bold" />
              </button>
            </Link>
          )}
        </>
      )}
    </>
  );
};
