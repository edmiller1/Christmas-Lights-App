import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
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
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-zinc-900">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                >
                  Verification Request Already Submitted
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This decoration has already had a verification request
                    submitted. Verification requests usually take 1-2 days to be
                    resolved.
                  </p>
                </div>
                <div className="flex mt-4 space-x-10">
                  <Button
                    onClick={() => navigate(`/decoration/${decorationId}`)}
                  >
                    Got it, thanks!
                  </Button>
                  <Button variant="secondary" onClick={() => navigate("/")}>
                    Go home
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
