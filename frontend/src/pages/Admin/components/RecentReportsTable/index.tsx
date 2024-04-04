import { CaretRight, Warning } from "@phosphor-icons/react";
import { TableLoading } from "..";

interface Props {
  getRecentReportsLoading: boolean;
}

export const RecentReportsTable = ({ getRecentReportsLoading }: Props) => {
  if (getRecentReportsLoading) {
    return <TableLoading />;
  }
  return (
    <>
      <h2 className="mx-auto mt-8 max-w-6xl text-lg font-medium leading-6">
        Recent reports
      </h2>
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden shadow rounded-tl-lg rounded-tr-lg sm:hidden"
        >
          <li>
            <div className="block bg-zinc-900 px-4 py-4 hover:bg-gray-50">
              <span className="flex items-center space-x-4">
                <span className="flex flex-1 space-x-2 truncate">
                  <Warning
                    size={16}
                    className="text-ch-dark dark:text-ch-light"
                  />
                  <span className="flex flex-col truncate text-sm">
                    <span className="truncate">somrhting</span>
                    <span>
                      <span className="font-medium">somrhting</span> somrhting
                    </span>
                    <time dateTime="15/11/2023 12:30pm">15/11/2023</time>
                  </span>
                </span>
                <CaretRight
                  size={20}
                  weight="bold"
                  className="text-ch-dark dark:text-ch-light"
                />
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow border border-black sm:rounded-lg">
              <table className="min-w-full divide-y divide-black">
                <thead>
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-sm font-semibold"
                      scope="col"
                    >
                      Id
                    </th>
                    <th
                      className="px-10 py-3 text-right text-sm font-semibold"
                      scope="col"
                    >
                      Decoration
                    </th>
                    <th
                      className="px-10 py-3 text-right text-sm font-semibold"
                      scope="col"
                    >
                      Document
                    </th>
                    <th
                      className="hidden px-10 py-3 text-left text-sm font-semibold md:block"
                      scope="col"
                    >
                      Status
                    </th>
                    <th
                      className="px-10 py-3 text-right text-sm font-semibold"
                      scope="col"
                    >
                      CreatedAt
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="">
                    <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm">
                      <div className="flex">
                        <div className="group inline-flex space-x-2 truncate text-sm">
                          <Warning
                            size={16}
                            weight="bold"
                            className="text-ch-dark dark:text-ch-light"
                          />
                          <p className="truncate text-gray-500 group-hover:text-gray-900">
                            HUH
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                      <span className="font-medium">$100</span>
                      USD
                    </td>
                    <td className="hidden whitespace-nowrap px-7 py-4 text-sm md:block">
                      <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize">
                        url...
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                      new
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <time dateTime="15/11/2023 12:30pm">15/11/2023</time>
                    </td>
                  </tr>
                </tbody>
              </table>
              <nav
                className="flex items-center justify-between border-t border-black px-4 py-3 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm">
                    Showing{" "}
                    <span className="font-medium">
                      10 most recent verification requests
                    </span>
                  </p>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
