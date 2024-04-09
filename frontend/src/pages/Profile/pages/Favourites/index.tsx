import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { CaretLeft } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Breadcrumbs } from "@/components";
import {
  EmptyState,
  FavouriteDecorationCard,
  YourDecorationsLoading,
} from "../../components";
import penguin from "../../../../assets/Penguin.png";

export const Favourites = () => {
  const { getToken, user } = useKindeAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);

  const { loading: getUserLoading, refetch: refetchUser } = useQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
    variables: { input: { id: state ? state : user?.id } },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data) {
        setCurrentUser(data.getUser);
      }
    },
  });

  const refetchUserData = () => {
    refetchUser();
  };

  const hasSession = async () => {
    const token = await getToken();
    if (!token) {
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    hasSession();
  }, [getToken]);

  if (getUserLoading) {
    return <YourDecorationsLoading />;
  }

  return (
    <>
      <div className="px-8 py-5 min-h-screen sm:hidden">
        <div role="button" className="pb-12" onClick={() => navigate(-1)}>
          <CaretLeft
            size={24}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </div>
        <h2 className="text-2xl font-bold">Favourites</h2>
        {currentUser?.favourites && currentUser?.favourites.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 my-8">
            {currentUser?.favourites.map((decoration, index) => (
              <FavouriteDecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={currentUser.favourites}
                index={index}
                refetchUserData={refetchUserData}
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
      <div className="hidden lg:ml-40 sm:block sm:min-h-screen xl:mx-96 sm:py-24">
        <Breadcrumbs firstWord="Profile" secondWord="Favourites" />
        <h1 className="mt-7 font-bold text-4xl">Favourites</h1>
        {currentUser?.favourites && currentUser.favourites.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-6 gap-y-8 my-8">
            {currentUser.favourites.map((decoration, index) => (
              <FavouriteDecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={currentUser.favourites}
                index={index}
                refetchUserData={refetchUserData}
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
