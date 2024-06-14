import { Check, Plus } from "@phosphor-icons/react";
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import { premiumFeatures } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { AppHeader, Footer } from "@/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";

export const Premium = () => {
  const { isAuthenticated, user } = useKindeAuth();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);

  //@ts-ignore
  const { data: getUserData } = useQuery<GetUserData, GetUserArgs>(GET_USER, {
    variables: { input: { id: user?.id ? user.id : "" } },
    onCompleted: (data) => {
      setCurrentUser(data.getUser);
    },
  });

  return (
    <>
      <div className="sm:hidden">
        <AppHeader
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
        />
        <div className="w-full">
          <img
            src="https://images.unsplash.com/photo-1470938017644-581bd9737a31?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            className="h-72 w-full object-cover object-center"
          />
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
                  className="py-3.5 text-left font-semibold text-gray-900"
                >
                  O
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
        <div className="shadow-xl border-t h-32 flex flex-col justify-center items-center px-5 bg-white fixed bottom-0 left-0 right-0 z-10">
          {isAuthenticated && currentUser ? (
            // do the stripe thing
            <Button
              onClick={() => navigate("/premium/create")}
              className="h-14 w-full text-xl font-bold"
            >
              Create Decoration
            </Button>
          ) : (
            // go to sign import { first } from 'react-native'
            <Button
              className="h-14 w-full text-xl font-bold"
              onClick={() => navigate("/signin")}
            >
              Get Premium
            </Button>
          )}
          <p className="mt-3 text-center text-black">cancel anytime</p>
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
                  $9 paid annually
                </h2>
                <p className="ml-4 text-sm mt-2">Cancel anytime</p>
                <Button className="ml-4 mt-10">Get Premium</Button>
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
