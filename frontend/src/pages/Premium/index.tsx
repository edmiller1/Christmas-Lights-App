import { CheckCircle, XCircle } from "@phosphor-icons/react";
import logo from "../../assets/logo.png";
import { freeFeatures, premiumFeatures } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { CREATE_SUBSCRIPTION_SESSION, GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
} from "@/graphql/queries/getUser/types";
import { CreateSubscriptionSession as CreateSubscriptionSessionData } from "@/graphql/queries/createSubscriptionSession/types";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export const Premium = () => {
  const { toast } = useToast();
  const { isAuthenticated, register } = useKindeAuth();
  const navigate = useNavigate();

  const { data: getUserData } = useQuery<GetUserData, GetUserArgs>(GET_USER);

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

  const currentUser = getUserData?.getUser ? getUserData.getUser : null;

  if (currentUser?.premium) {
    navigate(-1);
  }

  return (
    <div>
      <Link to="/">
        <img src={logo} alt="logo" className="h-16 m-5" />
      </Link>
      <div className="relative z-10 px-6 mx-auto my-12 max-w-7xl lg:px-8">
        <div className="grid max-w-md grid-cols-1 gap-8 mx-auto lg:max-w-5xl lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col bg-white shadow-xl rounded-3xl ring-1 ring-black/10">
            <div className="p-8 sm:p-10">
              <h3
                className="text-lg font-semibold leading-8 tracking-tight text-primary"
                id="tier-hobby"
              >
                Basic
              </h3>
              <div className="flex items-baseline mt-4 text-5xl font-bold tracking-tight text-gray-900">
                Free
              </div>
              <p className="mt-6 text-base leading-7 text-gray-600">
                All basic features included.
              </p>
            </div>
            <div className="flex flex-col flex-1 p-2">
              <div className="flex flex-col justify-between flex-1 p-6 rounded-2xl bg-gray-50 sm:p-8">
                <ul role="list" className="space-y-6">
                  {freeFeatures.map((feature) => (
                    <li className="flex items-start" key={feature.title}>
                      <div className="flex-shrink-0">
                        {feature.included ? (
                          <CheckCircle
                            size={24}
                            weight="bold"
                            color="#1acd81"
                          />
                        ) : (
                          <XCircle size={24} weight="bold" color="#B91C1C" />
                        )}
                      </div>
                      <p className="ml-3 text-sm leading-6 text-gray-600">
                        {feature.title}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white shadow-xl rounded-3xl ring-1 ring-black/10">
            <div className="p-8 sm:p-10">
              <h3
                className="text-lg font-semibold leading-8 tracking-tight text-primary"
                id="tier-team"
              >
                Premium
              </h3>
              <div className="flex items-baseline mt-4 text-5xl font-bold tracking-tight text-gray-900">
                $12
                <span className="text-lg font-semibold leading-8 tracking-normal text-gray-500">
                  /yr
                </span>
              </div>
              <p className="mt-6 text-base leading-7 text-gray-600">
                All features included.
              </p>
            </div>
            <div className="flex flex-col flex-1 p-2">
              <div className="flex flex-col justify-between flex-1 p-6 rounded-2xl bg-gray-50 sm:p-8">
                <ul role="list" className="space-y-6">
                  {premiumFeatures.map((feature) => (
                    <li className="flex items-start" key={feature.title}>
                      <div className="flex-shrink-0">
                        {feature.included ? (
                          <CheckCircle
                            size={24}
                            weight="bold"
                            color="#1acd81"
                          />
                        ) : (
                          <XCircle size={24} weight="bold" color="#B91C1C" />
                        )}
                      </div>
                      <p className="ml-3 text-sm leading-6 text-gray-600">
                        {feature.title}{" "}
                        {feature.flair ? (
                          <Badge className="ml-2">{feature.flair}</Badge>
                        ) : null}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {isAuthenticated ? (
                    <Button
                      onClick={() => createSubscriptionSession()}
                      className="inline-block w-full h-16 px-4 py-4 text-sm font-semibold leading-5 text-center text-white bg-gray-900 rounded-lg shadow-md hover:bg-white hover:text-gray-900 hover:ring-gray-900 hover:ring"
                      aria-describedby="tier-team"
                    >
                      Get premium
                    </Button>
                  ) : (
                    <Button
                      onClick={() => register()}
                      className="inline-block w-full h-16 px-4 py-4 text-sm font-semibold leading-5 text-center text-white bg-gray-900 rounded-lg shadow-md hover:bg-white hover:text-gray-900 hover:ring-gray-900 hover:ring"
                      aria-describedby="tier-team"
                    >
                      Get premium
                    </Button>
                  )}
                  <Button
                    onClick={() => createSubscriptionSession()}
                    className="inline-block w-full h-16 px-4 py-4 text-sm font-semibold leading-5 text-center text-white bg-gray-900 rounded-lg shadow-md hover:bg-white hover:text-gray-900 hover:ring-gray-900 hover:ring"
                    aria-describedby="tier-team"
                  >
                    Get premium
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
