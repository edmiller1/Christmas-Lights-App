import { useQuery } from "@apollo/client";
import { CaretLeft, Star } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, SEO } from "@/components";
import { EmptyState, YourDecorationsLoading } from "../../components";
import snowman from "../../../../assets/Snowman.png";
import { GET_USER_DECORATIONS } from "@/graphql/queries";
import { GetUserDecorations as GetUserDecorationsData } from "@/graphql/queries/getUserDecorations/types";
import { useToast } from "@/components/ui/use-toast";

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
        description={`${user.name} Decorations`}
        name={`${user.name} Decorations`}
        title={`${user.name} Decorations`}
        type={`${user.name} Decorations`}
      />
      <div className="px-8 py-5 sm:hidden">
        <div className="flex items-center space-x-3">
          <div role="button" onClick={() => navigate(-1)}>
            <CaretLeft size={24} weight="bold" />
          </div>
          <h2 className="text-2xl font-bold">Your Decorations</h2>
        </div>
        {userDecorations && userDecorations.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 my-8">
            {userDecorations.map((decoration) => (
              <Link key={decoration.id} to={`/decoration/${decoration.id}`}>
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
          <EmptyState
            description="You have not created any decorations yet."
            image={snowman}
          />
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:ml-40 sm:block sm:min-h-screen xl:mx-96 sm:py-24">
        <Breadcrumbs firstWord="Profile" secondWord="Decorations" />
        <h1 className="mt-7 font-bold text-4xl">Your Decorations</h1>
        {userDecorations && userDecorations.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 my-8">
            {userDecorations.map((decoration) => (
              <Link key={decoration.id} to={`/decoration/${decoration.id}`}>
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
          <EmptyState
            description="You have not created any decorations yet."
            image={snowman}
          />
        )}
      </div>
    </>
  );
};
