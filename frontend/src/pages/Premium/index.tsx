import { CaretLeft, Check, Plus } from "@phosphor-icons/react";
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import { premiumFeatures } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { AppHeader, Footer } from "@/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CREATE_SUBSCRIPTION_SESSION, GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { CreateSubscriptionSession as CreateSubscriptionSessionData } from "@/graphql/queries/createSubscriptionSession/types";
import { useToast } from "@/components/ui/use-toast";

export const Premium = () => {
  const { toast } = useToast();
  const { getToken, isAuthenticated, user, logout } = useKindeAuth();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);

  //@ts-ignore
  const { data: getUserData } = useQuery<GetUserData, GetUserArgs>(GET_USER, {
    variables: { input: { id: user?.id ? user.id : "" } },
    onCompleted: (data) => {
      setCurrentUser(data.getUser);
    },
  });

  const [createSubscriptionSession] =
    useLazyQuery<CreateSubscriptionSessionData>(CREATE_SUBSCRIPTION_SESSION, {
      onCompleted: (data) => {
        window.location.replace(data.createSubscriptionSession.toString());
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "An error occurred 😬",
          description: "Please try again later",
        });
      },
    });

  if (currentUser?.premium) {
    navigate(-1);
  }

  return (
    <>
      <div className="sm:hidden">
        <div className="w-full">
          <div className="relative">
            <button
              className="absolute left-3 top-3 px-1 py-1 bg-white rounded-full shadow-lg z-50"
              onClick={() => navigate(-1)}
            >
              <CaretLeft size={24} color="#000000" weight="bold" />
            </button>
            <div className="absolute left-5 top-20 z-50">
              <h2 className="text-3xl font-semibold">Christmas lights App +</h2>
              <h3 className="text-lg font-semibold">$12 paid annually</h3>
              <p className="mt-2 text-sm ml-1">cancel anytime</p>
              {isAuthenticated && currentUser && !currentUser.premium ? (
                <Button
                  onClick={() => createSubscriptionSession()}
                  className="mt-10 h-14 w-full text-xl font-bold"
                >
                  Get Premium
                </Button>
              ) : (
                <Button
                  className="mt-10 h-14 w-full text-xl font-bold"
                  onClick={() => navigate("/signin")}
                >
                  Get Premium
                </Button>
              )}
            </div>
            <img
              src="https://images.unsplash.com/photo-1470938017644-581bd9737a31?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              className="h-72 w-full object-cover object-center brightness-75"
            />
          </div>

          <table className="bg-white divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-2/3 py-3.5 text-left font-semibold text-gray-900"
                >
                  Features
                </th>
                <th
                  scope="col"
                  className="py-3.5 text-left font-semibold text-gray-900"
                >
                  Free
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-2.5 text-left font-semibold text-gray-900"
                >
                  ⭐️
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {premiumFeatures.map((feature) => (
                <tr key={feature.title} className="even:bg-gray-100">
                  <td className="flex items-center text-sm whitespace-nowrap py-4 pl-1 font-sm text-gray-900">
                    {feature.title}{" "}
                    {feature.flair && (
                      <Badge className="ml-5">{feature.flair}</Badge>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-600">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check
                          className="ml-2"
                          color="#DC2626"
                          size={24}
                          weight="bold"
                        />
                      ) : null
                    ) : (
                      feature.free
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    {typeof feature.premium === "boolean" ? (
                      feature.premium ? (
                        <Check
                          className="mr-2"
                          color="#DC2626"
                          size={24}
                          weight="bold"
                        />
                      ) : null
                    ) : (
                      feature.premium
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <AppHeader
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
        />
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1470938017644-581bd9737a31?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            className="h-[100vh] w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10">
            <div className="flex sm:flex-col xl:flex-row">
              <div className="p-10 sm:w-full xl:w-1/2">
                <img src={logo} alt="logo" className="h-16" />
                <h1 className="flex text-6xl ml-4 my-5 font-bold">
                  Christmas Lights App
                  <Plus
                    size={28}
                    className="sm:mr-24 sm:mt-5 md:ml-2 md:mr-0 md:mt-5"
                    weight="bold"
                    color="#DC2626"
                  />
                </h1>
                <h2 className="text-2xl ml-4 font-semibold">
                  $12 paid annually
                </h2>
                <p className="ml-4 text-sm mt-2">Cancel anytime</p>
                {isAuthenticated && currentUser && !currentUser.premium ? (
                  <Button
                    className="ml-4 mt-10"
                    onClick={() => createSubscriptionSession()}
                  >
                    Get Premium
                  </Button>
                ) : (
                  <Button
                    className="ml-4 mt-10"
                    onClick={() => navigate("/signin")}
                  >
                    Get Premium
                  </Button>
                )}
              </div>
              <div className="p-10 sm:w-full xl:w-1/2">
                <div className="p-4 h-full w-full rounded-lg bg-white">
                  <table className="min-w-full divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="w-2/3 py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-3"
                        >
                          Features
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900"
                        >
                          Free
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900"
                        >
                          Premium
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {premiumFeatures.map((feature) => (
                        <tr key={feature.title} className="even:bg-gray-100">
                          <td className="flex items-center space-x-3 whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-3">
                            {feature.title}{" "}
                            {feature.flair && (
                              <Badge className="ml-5">{feature.flair}</Badge>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-center text-gray-600">
                            {typeof feature.free === "boolean" ? (
                              feature.free ? (
                                <Check color="#DC2626" />
                              ) : null
                            ) : (
                              feature.free
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-center text-gray-600">
                            {typeof feature.premium === "boolean" ? (
                              feature.premium ? (
                                <Check
                                  className="ml-14"
                                  color="#DC2626"
                                  size={24}
                                  weight="bold"
                                />
                              ) : null
                            ) : (
                              feature.premium
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
