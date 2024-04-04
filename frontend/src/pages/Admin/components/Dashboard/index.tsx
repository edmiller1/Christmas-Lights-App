import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_RECENT_REPORTS,
  GET_UNRESOLVED_REPORTS_COUNT,
  GET_VERIFICATION_REQUESTS,
  GET_VERIFICATION_REQUESTS_COUNT,
} from "@/graphql/queries";
import { GetVerificationRequests as GetVerificationRequestsData } from "@/graphql/queries/getVerificationRequests/types";
import { GetRecentReports as GetRecentReportsData } from "@/graphql/queries/getRecentReports/types";
import {
  RecentReportsTable,
  RecentVerificationsTable,
  UnresolvedReportsCard,
  VerificationRequestsCard,
} from "..";

export const Dashboard = () => {
  const [verificationRequests, setVerificationRequests] = useState<number>(0);
  const [unresolvedReports, setUnresolvedReports] = useState<number>(0);

  const { loading: getUnresolvedReportsCountLoading } = useQuery(
    GET_UNRESOLVED_REPORTS_COUNT,
    {
      onCompleted: (data) => {
        setUnresolvedReports(data.getUnresolvedReportsCount);
      },
    }
  );

  const { loading: getVerificationRequestsCountLoading } = useQuery(
    GET_VERIFICATION_REQUESTS_COUNT,
    {
      onCompleted: (data) => {
        setVerificationRequests(data.getVerificationRequestsCount as number);
      },
    }
  );

  const { data: getRecentReportsData, loading: getRecentReportsLoading } =
    useQuery<GetRecentReportsData>(GET_RECENT_REPORTS);

  const {
    data: getVerificationRequestsData,
    loading: getVerificationRequestsLoading,
  } = useQuery<GetVerificationRequestsData>(GET_VERIFICATION_REQUESTS);

  //@ts-ignore
  const recentReports = getRecentReportsData?.getRecentReports
    ? getRecentReportsData.getRecentReports
    : null;

  //@ts-ignore
  const verificationRequestsData =
    getVerificationRequestsData?.getVerificationRequests
      ? getVerificationRequestsData?.getVerificationRequests
      : null;

  return (
    <main className="py-10 w-full lg:pl-72">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="mt-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6">Overview</h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Card */}
              <UnresolvedReportsCard
                unresolvedReports={unresolvedReports}
                getUnresolvedReportsCountLoading={
                  getUnresolvedReportsCountLoading
                }
              />
              <VerificationRequestsCard
                verificationRequests={verificationRequests}
                getVerificationRequestsCountLoading={
                  getVerificationRequestsCountLoading
                }
              />
            </div>
            <RecentVerificationsTable
              getVerificationRequestsLoading={getVerificationRequestsLoading}
            />
            <RecentReportsTable
              getRecentReportsLoading={getRecentReportsLoading}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
