import { useQuery } from "@apollo/client";
import { CaretLeft, SealWarning, Star } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, SEO } from "@/components";
import { EmptyState, YourDecorationsLoading } from "../../components";
import snowman from "../../../../assets/Snowman.png";
import { GET_USER_DECORATIONS } from "@/graphql/queries";
import { GetUserDecorations as GetUserDecorationsData } from "@/graphql/queries/getUserDecorations/types";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

export const YourDecorations = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: getUserDecorationsData, loading: getUserDecorationsLoading } =
    useQuery<GetUserDecorationsData>(GET_USER_DECORATIONS, {
      onError: (err) => {
        toast({
          title: "UH oh! 😬",
          description: "Failed to get decorations, try refreshing the page.",
          variant: "destructive",
        });
        console.log(err);
      },
    });

  const userDecorations =
    getUserDecorationsData?.getUserDecorations.decorations;

  const user = {
    id: getUserDecorationsData?.getUserDecorations.id,
    name: getUserDecorationsData?.getUserDecorations.name,
  };

  if (getUserDecorationsLoading) {
    return <YourDecorationsLoading />;
  }

  return (
    <>
      <SEO
        description={`${user.name} - Decorations`}
        name={`${user.name} - Decorations`}
        title={`${user.name} - Decorations`}
        type={`${user.name} - Decorations`}
      />
      <div className="px-8 py-5 sm:hidden">
        <div className="flex items-center space-x-3">
          <div role="button" onClick={() => navigate(-1)}>
            <CaretLeft size={24} weight="bold" />
          </div>
          <h2 className="text-2xl font-bold">Your Decorations</h2>
        </div>
        {userDecorations && userDecorations.length > 0 ? (
          <div className="grid grid-cols-1 my-8 gap-x-6 gap-y-10">
            {userDecorations.map((decoration) => (
              <Link key={decoration.id} to={`/decoration/${decoration.id}`}>
                <div className="group">
                  <div className="w-full overflow-hidden bg-gray-200 rounded-lg h-3/5">
                    <img
                      src={decoration.images[0].url}
                      alt="decoration image"
                      className="object-cover object-center w-full h-80"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="mt-1 font-bold">{decoration.name}</h3>
                    <div className="flex items-center mt-1 space-x-1">
                      <Star
                        size={16}
                        className="text-ch-dark dark:text-ch-light"
                      />
                      <span>{decoration.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    {decoration.city}, {decoration.country}
                  </p>
                  {decoration.verification_submitted ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#1acd81] rounded-full animate-pulse"></div>
                      <span className="text-xs">Verification pending...</span>
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            description="You have not created any decorations yet."
            image={snowman}
          />
        )}
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:min-h-screen sm:mx-24 sm:py-24">
        <Breadcrumbs firstWord="Profile" secondWord="Decorations" />
        <h1 className="text-4xl font-bold mt-7">Your Decorations</h1>
        {userDecorations && userDecorations.length > 0 ? (
          <div className="grid grid-cols-4 my-8 gap-x-6 gap-y-10">
            {userDecorations.map((decoration) => (
              <Link key={decoration.id} to={`/decoration/${decoration.id}`}>
                <div className="group">
                  <div className="relative w-64 overflow-hidden bg-gray-200 rounded-lg h-3/5">
                    {decoration.verification_submitted ? (
                      <div className="absolute right-5 top-5">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <SealWarning
                                size={28}
                                weight="fill"
                                color="#1acd81"
                              />
                            </TooltipTrigger>
                            <TooltipContent className="p-2 text-sm text-white rounded-lg bg-zinc-800">
                              Verification pending
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : null}
                    <img
                      src={decoration.images[0].url}
                      alt="decoration image"
                      className="object-cover object-center w-64 h-64"
                    />
                  </div>
                  <div className="flex items-center justify-between w-64">
                    <h3 className="mt-4 font-bold">{decoration.name}</h3>
                    <div className="flex items-center mt-3 space-x-1">
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
          <EmptyState
            description="You have not created any decorations yet."
            image={snowman}
          />
        )}
      </div>
    </>
  );
};
