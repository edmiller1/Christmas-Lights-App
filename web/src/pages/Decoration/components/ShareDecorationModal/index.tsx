import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Copy,
  Envelope,
  FacebookLogo,
  MessengerLogo,
  TwitterLogo,
  X,
} from "@phosphor-icons/react";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  isShareModalOpen: boolean;
  setIsShareModalOpen: (isShareModalOpen: boolean) => void;
  decorationImage: { id: string; url: string } | undefined;
  decorationName: string | undefined;
  decorationCountry: string | undefined;
  decorationCity: string | undefined;
}

export const ShareDecorationModal = ({
  isShareModalOpen,
  setIsShareModalOpen,
  decorationImage,
  decorationCity,
  decorationCountry,
  decorationName,
}: Props) => {
  const url = useLocation();
  const { toast } = useToast();

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      "https://www.christmas-lights.com" + url.pathname
    );
    toast({
      variant: "success",
      title: "Success 🎉",
      description: "Link copied to clipboard",
    });
  };

  return (
    <Transition appear show={isShareModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsShareModalOpen(false)}
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
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                  >
                    Share this decoration
                  </Dialog.Title>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsShareModalOpen(false)}
                  >
                    <X
                      size={16}
                      weight="bold"
                      className="text-ch-dark dark:text-ch-light"
                    />
                  </Button>
                </div>
                <div className="flex items-center space-x-3 mt-5 text-ch-dark dark:text-ch-light">
                  <img
                    src={decorationImage?.url}
                    alt="decoration image"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{decorationName}</span>
                    <span className="font-light text-sm">
                      {decorationCity}, {decorationCountry}
                    </span>
                  </div>
                </div>
                <button
                  className="w-full mt-10 px-3 py-3 flex items-center justify-between rounded-lg border text-ch-dark dark:text-ch-light dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-900"
                  onClick={copyLink}
                >
                  <p>Copy Link</p>
                  <Copy
                    size={28}
                    className="mr-5 ml-2 text-ch-dark dark:text-ch-light"
                  />
                </button>
                <div className="w-full mt-5 rounded-tr-lg rounded-tl-lg border rounded-bl-lg rounded-br-lg text-ch-dark dark:text-ch-light dark:border-zinc-700 dark:bg-zinc-800">
                  <EmailShareButton
                    url={"https://www.christmas-lights.com" + url.pathname}
                    subject="Check out this decoration!"
                    body="123"
                    className="w-full"
                    children={
                      <div className="w-full flex items-center justify-between px-3 py-3 dark:hover:bg-zinc-900">
                        <p>Email</p>
                        <Envelope
                          size={28}
                          className="mr-5 ml-2 text-ch-dark dark:text-ch-light"
                        />
                      </div>
                    }
                  />
                  <Separator />
                  <FacebookMessengerShareButton
                    url={"https://www.christmas-lights.com" + url.pathname}
                    appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                    className="w-full"
                    children={
                      <div className="w-full flex items-center justify-between px-3 py-3 dark:hover:bg-zinc-900">
                        <p>Messenger</p>
                        <MessengerLogo
                          size={28}
                          className="mr-5 ml-2 dark:text-ch-light"
                        />
                      </div>
                    }
                  />
                  <Separator />
                  <FacebookShareButton
                    url={"https://www.christmas-lights.com" + url.pathname}
                    className="w-full"
                    children={
                      <div className="w-full flex items-center justify-between px-3 py-3 dark:hover:bg-zinc-900">
                        <p>Facebook</p>
                        <FacebookLogo
                          size={28}
                          className="mr-5 ml-2 dark:text-ch-light"
                        />
                      </div>
                    }
                  />
                  <Separator />
                  <TwitterShareButton
                    url={"https://www.christmas-lights.com" + url.pathname}
                    className="w-full"
                    children={
                      <div className="w-full flex items-center justify-between px-3 py-3 dark:hover:bg-zinc-900">
                        <p>Twitter</p>
                        <TwitterLogo
                          size={28}
                          className="mr-5 ml-2 dark:text-ch-light"
                        />
                      </div>
                    }
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
