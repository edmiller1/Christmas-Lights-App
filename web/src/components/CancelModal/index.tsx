import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../ui/button";

interface Props {
  title: string;
  body: string;
  confirmText: string;
  cancelText: string;
  isCancelOpen: boolean;
  setIsCancelOpen: (isOpen: boolean) => void;
  discardFunction: () => void;
}

export const CancelModal = ({
  body,
  cancelText,
  confirmText,
  discardFunction,
  isCancelOpen,
  setIsCancelOpen,
  title,
}: Props) => {
  return (
    <Transition.Root appear show={isCancelOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
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
                  {title}
                </Dialog.Title>
                <div className="my-2">
                  <p className="text-sm text-gray-500">{body}</p>
                </div>

                <div className="mt-8 flex items-center space-x-4">
                  <Button onClick={discardFunction}>{confirmText}</Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsCancelOpen(false)}
                  >
                    {cancelText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
