import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Info } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

interface Props {
  decorationId: string | undefined;
}

export const VerifiedPopOver = ({ decorationId }: Props) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="outline-none mr-2">
            <Info
              size={28}
              weight="bold"
              className="mt-2 cursor-pointer text-ch-red"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-[15rem] -translate-x-1/2 transform">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-white p-3 dark:bg-zinc-800">
                  Your decoration is not verified. We make sure all decorations
                  are verified for when users visit decorations, they can
                  guarantee that the decoration actually exists.
                </div>
                <div className="bg-white p-3 dark:bg-zinc-800">
                  Unverified decorations are not publicly available.
                </div>
                <Separator />
                <div className="bg-white p-3 dark:bg-zinc-800">
                  You can submit your decoration for verification{" "}
                  <Link
                    to={`/verify-decoration/${decorationId}`}
                    className="text-ch-red underline"
                  >
                    here.
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
