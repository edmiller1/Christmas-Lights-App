import { CaretRight, House, SealCheck, Warning } from "@phosphor-icons/react";
import { ChevronRight } from "lucide-react";

export const Dashboard = () => {
  return (
    <main className="py-10 lg:pl-72">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6">Overview</h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
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
                          <div className="text-lg font-medium">145</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-800 px-5 py-3">
                  <div className="text-sm">
                    <span className="underline font-medium text-ch-red hover:text-ch-red-hover">
                      View all
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-zinc-900 shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <SealCheck
                        size={24}
                        weight="bold"
                        className="text-ch-dark dark:text-ch-light"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium">
                          Verification Requests
                        </dt>
                        <dd>
                          <div className="text-lg font-medium">98</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-800 px-5 py-3">
                  <div className="text-sm">
                    <span className="underline font-medium text-ch-red hover:text-ch-red-hover">
                      View all
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="mx-auto mt-8 max-w-6xl text-lg font-medium leading-6">
              Recent activity
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
                        <House
                          size={16}
                          className="text-ch-dark dark:text-ch-light"
                        />
                        <span className="flex flex-col truncate text-sm">
                          <span className="truncate">somrhting</span>
                          <span>
                            <span className="font-medium">somrhting</span>{" "}
                            somrhting
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

              <nav
                className="flex items-center justify-between rounded-bl-lg rounded-br-lg border-t border-black bg-zinc-800 px-4 py-3"
                aria-label="Pagination"
              >
                <div className="flex flex-1 justify-between">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md bg-ch-turquoise px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md bg-ch-turquoise px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
              </nav>
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
                            Transaction
                          </th>
                          <th
                            className="px-10 py-3 text-right text-sm font-semibold"
                            scope="col"
                          >
                            Amount
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
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="">
                          <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm">
                            <div className="flex">
                              <div className="group inline-flex space-x-2 truncate text-sm">
                                <House
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
                              amazing
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                            <time dateTime="15/11/2023 12:30pm">
                              15/11/2023
                            </time>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <nav
                      className="flex items-center justify-between border-t border-black px-4 py-3 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div className="hidden sm:block">
                        <p className="text-sm">
                          Showing <span className="font-medium">1</span> to{" "}
                          <span className="font-medium">10</span> of{" "}
                          <span className="font-medium">20</span> results
                        </p>
                      </div>
                      <div className="flex flex-1 justify-between gap-x-3 sm:justify-end">
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-md bg-ch-turquoise px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                        >
                          Previous
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-md bg-ch-turquoise px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                        >
                          Next
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
