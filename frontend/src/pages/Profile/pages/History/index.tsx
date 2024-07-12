import { useQuery } from "@apollo/client";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, SEO } from "@/components";
import {
  EmptyState,
  HistoryDecorationCard,
  YourDecorationsLoading,
} from "../../components";
import reindeer from "../../../../assets/Reindeer.png";
import { GET_USER_HISTORY } from "@/graphql/queries";
import { GetUserHistory as GetUserHistoryData } from "@/graphql/queries/getUserHistory/types";
import { useToast } from "@/components/ui/use-toast";

export const History = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    data: getUserHistoryData,
    loading: getUserHistoryLoading,
    refetch: refetchUserHistory,
  } = useQuery<GetUserHistoryData>(GET_USER_HISTORY, {
    onError: (err) => {
      toast({
        title: "UH oh! 😬",
        description: "Failed to get history, try refreshing the page.",
        variant: "destructive",
      });
      console.log(err);
    },
  });

  const userHistory = getUserHistoryData?.getUserHistory.history;
  const user = {
    id: getUserHistoryData?.getUserHistory.id,
    name: getUserHistoryData?.getUserHistory.name,
  };

  const refetchHistory = () => {
    refetchUserHistory();
  };

  if (getUserHistoryLoading) {
    return <YourDecorationsLoading />;
  }

  return (
    <>
      <SEO
        description={`${user?.name} - History`}
        name={`${user?.name} - History`}
        title={`${user?.name} - History`}
        type={`${user?.name} - History`}
      />
      <div className="px-8 py-5 min-h-screen sm:hidden">
        <div className="flex items-center space-x-3">
          <div role="button" onClick={() => navigate(-1)}>
            <CaretLeft
              size={24}
              weight="bold"
              className="text-ch-dark dark:text-ch-light"
            />
          </div>
          <h2 className="text-2xl font-bold">History</h2>
        </div>
        {userHistory && userHistory.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 my-8">
            {userHistory.map((decoration, index) => (
              <HistoryDecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={userHistory}
                index={index}
                refetchHistory={refetchHistory}
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
      <div className="hidden sm:mx-24 md:mx-28 lg:ml-40 sm:block sm:min-h-screen xl:mx-96 sm:py-24">
        <Breadcrumbs firstWord="Profile" secondWord="History" />
        <h1 className="mt-7 font-bold text-4xl">History</h1>
        {userHistory && userHistory.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-6 gap-y-8 my-8">
            {userHistory.map((decoration, index) => (
              <HistoryDecorationCard
                key={decoration.id}
                decoration={decoration}
                decorations={userHistory}
                index={index}
                refetchHistory={refetchHistory}
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
