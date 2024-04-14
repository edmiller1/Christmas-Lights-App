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
import { Breadcrumbs, SEO } from "@/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import {
  EmptyState,
  HistoryDecorationCard,
  YourDecorationsLoading,
} from "../../components";
import reindeer from "../../../../assets/Reindeer.png";

export const History = () => {
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
      <SEO
        description={`${currentUser?.name} History`}
        name={`${currentUser?.name} History`}
        title={`${currentUser?.name} History`}
        type={`${currentUser?.name} History`}
      />
      <div className="px-8 py-5 min-h-screen sm:hidden">
        <div role="button" className="pb-12" onClick={() => navigate(-1)}>
          <CaretLeft
            size={24}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </div>
        <h2 className="text-2xl font-bold">History</h2>
        {currentUser?.history && currentUser?.history.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 my-8">
            {currentUser?.history.map((decoration, index) => (
              <HistoryDecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={currentUser.history}
                index={index}
                refetchUserData={refetchUserData}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            description="You haven't viewed any decorations yet."
            image={reindeer}
          />
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:ml-40 sm:block sm:min-h-screen xl:mx-96 sm:py-24">
        <Breadcrumbs firstWord="Profile" secondWord="History" />
        <h1 className="mt-7 font-bold text-4xl">History</h1>
        {currentUser?.history && currentUser.history.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-6 gap-y-8 my-8">
            {currentUser.history.map((decoration, index) => (
              <HistoryDecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={currentUser.history}
                index={index}
                refetchUserData={refetchUserData}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            description="You haven't viewed any decorations yet."
            image={reindeer}
          />
        )}
      </div>
    </>
  );
};
