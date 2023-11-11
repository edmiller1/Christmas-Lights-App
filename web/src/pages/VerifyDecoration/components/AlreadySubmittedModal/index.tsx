import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { CircleNotch, Star, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface Props {
  alreadySubmitted: boolean;
  setAlreadySubmitted: (alreadySubmitted: boolean) => void;
  decorationId: string | undefined;
}

export const AlreadySubmittedModal = ({
  alreadySubmitted,
  setAlreadySubmitted,
  decorationId,
}: Props) => {
  const navigate = useNavigate();
  return (
    <Transition appear show={alreadySubmitted} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setAlreadySubmitted(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Verification Request Already Submitted
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This decoration has already had a verification request
                    submitted. Verification requests usually take 1-2 days to be
                    resolved.
                  </p>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => navigate(`/decoration/${decorationId}`)}
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
