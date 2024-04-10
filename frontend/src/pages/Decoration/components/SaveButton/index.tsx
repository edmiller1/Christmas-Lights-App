import { Button } from "@/components/ui/button";
import { Get_User } from "@/graphql/queries/getUser/types";
import { CircleNotch, Heart } from "@phosphor-icons/react";

interface Props {
  currentUser: Get_User | null;
  decorationId: string | undefined;
  addtoFavourites: () => void;
  removeFromFavourites: () => void;
  favouriteDecorationLoading: boolean;
  unfavouriteDecorationLoading: boolean;
}

export const SaveButton = ({
  currentUser,
  decorationId,
  addtoFavourites,
  removeFromFavourites,
  favouriteDecorationLoading,
  unfavouriteDecorationLoading,
}: Props) => {
  return (
    <>
      {currentUser?.favourites.some(
        (favourite) => favourite.id === decorationId
      ) ? (
        <>
          {unfavouriteDecorationLoading ? (
            <Button variant="ghost" onClick={removeFromFavourites}>
              <CircleNotch
                size={20}
                className="text-ch-dark dark:text-ch-light animate-spin"
              />
              <span className="ml-2">Save</span>
            </Button>
          ) : (
            <Button variant="ghost" onClick={removeFromFavourites}>
              <Heart size={20} weight="fill" className="text-ch-pink" />
              <span className="ml-2">Save</span>
            </Button>
          )}
        </>
      ) : (
        <>
          {favouriteDecorationLoading ? (
            <Button variant="ghost" onClick={removeFromFavourites}>
              <CircleNotch
                size={20}
                className="text-ch-dark dark:text-ch-light animate-spin"
              />
              <span className="ml-2">Save</span>
            </Button>
          ) : (
            <Button variant="ghost" onClick={addtoFavourites}>
              <Heart size={20} className="text-ch-dark dark:text-ch-light" />
              <span className="ml-2">Save</span>
            </Button>
          )}
        </>
      )}
    </>
  );
};
