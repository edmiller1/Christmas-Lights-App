import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { CaretLeft, Star } from "@phosphor-icons/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { NoDecorations, YourDecorationsLoading } from "./components";
import { Breadcrumbs } from "@/components";
import { useUserData } from "@/lib/hooks";

export const YourDecorations = () => {
  const currentUser = useUserData();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<Get_User | null>(null);

  const { loading: getUserLoading } = useQuery<GetUserData, GetUserArgs>(
    GET_USER,
    {
      variables: { input: { id: state ? state : currentUser?.uid } },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        if (data) {
          setUser(data.getUser);
        }
      },
    }
  );

  if (getUserLoading) {
    return <YourDecorationsLoading />;
  }

  return (
    <>
      <div className="px-8 py-5 sm:hidden">
        <div role="button" className="pb-12" onClick={() => navigate(-1)}>
          <CaretLeft
            size={24}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </div>
        <h2 className="text-2xl font-bold">Your Decorations</h2>
        {user?.decorations && user.decorations.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 my-8">
            {user?.decorations.map((decoration) => (
              <Link to={`/decoration/${decoration.id}`}>
                <div className="group">
                  <div className="w-full h-3/5 overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={decoration.images[0].url}
                      alt="decoration image"
                      className="h-80 w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="mt-4 text-lg font-bold">
                      {decoration.name}
                    </h3>
                    <div className="flex items-center space-x-1 mt-3">
                      <Star
                        size={20}
                        className="text-ch-dark dark:text-ch-light"
                      />
                      <span className="text-lg">{decoration.rating}</span>
                    </div>
                  </div>
                  <p className="mt-1">
                    {decoration.city}, {decoration.country}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <NoDecorations />
        )}
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:mx-96 sm:py-24">
        <Breadcrumbs firstWord="Profile" secondWord="Decorations" />
        <h1 className="mt-7 font-bold text-4xl">Your Decorations</h1>
        {user?.decorations && user.decorations.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 my-8">
            {user.decorations.map((decoration) => (
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
                    <h3 className="mt-4 font-bold">{decoration.name}</h3>
                    <div className="flex items-center space-x-1 mt-3">
                      <Star
                        size={16}
                        className="text-ch-dark dark:text-ch-light"
                      />
                      <span className="">{decoration.rating}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm">
                    {decoration.city}, {decoration.country}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <NoDecorations />
        )}
      </div>
    </>
  );
};
