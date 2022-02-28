import { Dialog, Transition } from "@headlessui/react";
import {
  CaretLeft,
  House,
  List,
  SealCheck,
  Warning,
  X,
} from "@phosphor-icons/react";
import { Fragment, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../../../assets/ChristmasLights-House-Logo.png";
import { Button } from "@/components/ui/button";

interface Props {
  logOut: () => void;
}

export const SideNav = ({ logOut }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <CaretLeft
                        size={20}
                        weight="bold"
                        className="text-ch-dark dark:text-ch-light"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 bg-zinc-900">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-10 w-auto"
                      src={logo}
                      alt="Your Company"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                              isActive
                                ? "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo bg-gray-200 dark:bg-zinc-700 dark:text-ch-light"
                                : "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo hover:bg-gray-200 dark:text-ch-light dark:hover:bg-zinc-700"
                            }
                          >
                            <li className="flex gap-x-3">
                              <House
                                size={24}
                                weight="bold"
                                className="text-ch-dark dark:text-ch-light"
                              />
                              <span className={`${!sidebarOpen && "scale-0"}`}>
                                Dashboard
                              </span>
                            </li>
                          </NavLink>
                        </ul>
                      </li>
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          <NavLink
                            to="/"
                            className={({ isActive }) =>
                              isActive
                                ? "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo bg-gray-200 dark:bg-zinc-700 dark:text-ch-light"
                                : "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo hover:bg-gray-200 dark:text-ch-light dark:hover:bg-zinc-700"
                            }
                          >
                            <li className="flex gap-x-3">
                              <Warning
                                size={24}
                                weight="bold"
                                className="text-ch-dark dark:text-ch-light"
                              />
                              <span className={`${!sidebarOpen && "scale-0"}`}>
                                Reports
                              </span>
                            </li>
                          </NavLink>
                        </ul>
                      </li>
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          <NavLink
                            to="/"
                            className={({ isActive }) =>
                              isActive
                                ? "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo bg-gray-200 dark:bg-zinc-700 dark:text-ch-light"
                                : "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo hover:bg-gray-200 dark:text-ch-light dark:hover:bg-zinc-700"
                            }
                          >
                            <li className="flex gap-x-3">
                              <SealCheck
                                size={24}
                                weight="bold"
                                className="text-ch-dark dark:text-ch-light"
                              />
                              <span className={`${!sidebarOpen && "scale-0"}`}>
                                Verifications
                              </span>
                            </li>
                          </NavLink>
                        </ul>
                      </li>
                      <li className="mt-auto my-3 w-full">
                        <Button className="w-full" onClick={logOut}>
                          Log Out
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden bg-zinc-900 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-black px-6">
          <div className="flex h-16 shrink-0 items-center">
            <img className="h-10 w-auto" src={logo} alt="Your Company" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive
                        ? "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo bg-gray-200 dark:bg-zinc-700 dark:text-ch-light"
                        : "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo hover:bg-gray-200 dark:text-ch-light dark:hover:bg-zinc-700"
                    }
                  >
                    <li className="flex gap-x-3">
                      <House
                        size={24}
                        weight="bold"
                        className="text-ch-dark dark:text-ch-light"
                      />
                      <span>Dashboard</span>
                    </li>
                  </NavLink>
                </ul>
              </li>
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo bg-gray-200 dark:bg-zinc-700 dark:text-ch-light"
                        : "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo hover:bg-gray-200 dark:text-ch-light dark:hover:bg-zinc-700"
                    }
                  >
                    <li className="flex gap-x-3">
                      <Warning
                        size={24}
                        weight="bold"
                        className="text-ch-dark dark:text-ch-light"
                      />
                      <span>Reports</span>
                    </li>
                  </NavLink>
                </ul>
              </li>
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo bg-gray-200 dark:bg-zinc-700 dark:text-ch-light"
                        : "group flex gap-x-3 rounded-md ml-3 p-2 text-base leading-6 font-semibold cursor-pointer text-ch-indigo hover:bg-gray-200 dark:text-ch-light dark:hover:bg-zinc-700"
                    }
                  >
                    <li className="flex gap-x-3">
                      <SealCheck
                        size={24}
                        weight="bold"
                        className="text-ch-dark dark:text-ch-light"
                      />
                      <span>Verifications</span>
                    </li>
                  </NavLink>
                </ul>
              </li>
              <li className="mx-auto mt-auto my-3 w-full">
                <Button className="w-full" onClick={logOut}>
                  Log Out
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <List
            size={20}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-ch-dark dark:text-ch-light">
          Dashboard
        </div>
      </div>
    </div>
  );
};
