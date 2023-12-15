import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { CaretLeft, Star } from "@phosphor-icons/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { YourDecorationsLoading } from "../YourDecorations/components";
import { NoHistory } from "./components";
import { Breadcrumbs } from "@/components";

export const History = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState<Get_User | null>(null);

  const { loading: getUserLoading } = useQuery<GetUserData, GetUserArgs>(
    GET_USER,
    {
      variables: { input: { id: state } },
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
        <h2 className="text-2xl font-bold">History</h2>
        {user?.history && user?.history.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 my-8">
            {user?.history.map((decoration) => (
              <Link to={`/decoration/${decoration.id}`} key={decoration.id}>
                <div key={decoration.id} className="group">
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
          <NoHistory />
        )}
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:mx-96 sm:my-16 sm:h-full">
        <Breadcrumbs firstWord="Profile" secondWord="History" />
        <h1 className="mt-7 font-bold text-4xl">History</h1>
        {user?.history && user.history.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-6 gap-y-8 my-8">
            {user.history.map((decoration) => (
              <Link to={`/decoration/${decoration.id}`}>
                <div key={decoration.id} className="group">
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
          <NoHistory />
        )}
      </div>
    </>
  );
};
