import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";

import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { CaretLeft } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";
import { YourDecorationsLoading } from "../YourDecorations/components";
import { DecorationCard, NoHistory } from "./components";
import { Breadcrumbs } from "@/components";
import { useUserData } from "@/lib/hooks";

export const History = () => {
  const currentUser = useUserData();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState<Get_User | null>(null);

  const { loading: getUserLoading, refetch: refetchUser } = useQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
    variables: { input: { id: state ? state : currentUser?.uid } },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data) {
        setUser(data.getUser);
      }
    },
  });

  const refetchUserData = () => {
    refetchUser();
  };

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
        <h2 className="text-2xl font-bold">History</h2>
        {user?.history && user?.history.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 my-8">
            {user?.history.map((decoration, index) => (
              <DecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={user.history}
                index={index}
                refetchUserData={refetchUserData}
              />
            ))}
          </div>
        ) : (
          <NoHistory />
        )}
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:min-h-screen sm:mx-96 sm:py-24 sm:h-full">
        <Breadcrumbs firstWord="Profile" secondWord="History" />
        <h1 className="mt-7 font-bold text-4xl">History</h1>
        {user?.history && user.history.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-6 gap-y-8 my-8">
            {user.history.map((decoration, index) => (
              <DecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={user.history}
                index={index}
                refetchUserData={refetchUserData}
              />
            ))}
          </div>
        ) : (
          <NoHistory />
        )}
      </div>
    </>
  );
};
