import { Warning } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { CardLoading } from "..";

interface Props {
  unresolvedReports: number;
  getUnresolvedReportsCountLoading: boolean;
}

export const UnresolvedReportsCard = ({
  unresolvedReports,
  getUnresolvedReportsCountLoading,
}: Props) => {
  if (getUnresolvedReportsCountLoading) {
    return <CardLoading />;
  }
  return (
    <div className="overflow-hidden rounded-lg bg-zinc-900 shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Warning
              size={24}
              weight="bold"
              className="text-ch-dark dark:text-ch-light"
            />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium">
                Unresolved Reports
              </dt>
              <dd>
                <div className="text-lg font-medium">{unresolvedReports}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-zinc-800 h-full px-5 py-3">
        <div className="text-sm">
          <Link to="/">
            <span className="underline font-medium text-primary">View all</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
