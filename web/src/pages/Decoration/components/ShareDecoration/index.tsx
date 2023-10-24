import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Code,
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
import { motion, Variants } from "framer-motion";
import { useLocation } from "react-router-dom";

interface Props {
  setShowShareOptions: (showShareOptions: boolean) => void;
  decorationImage: { id: string; url: string } | undefined;
  decorationName: string | undefined;
  decorationCountry: string | undefined;
  decorationCity: string | undefined;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const ShareDecoration = ({
  setShowShareOptions,
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
    <>
      <motion.div
        className="overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        onClick={() => setShowShareOptions(false)}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[75%] w-full z-50 rounded-tl-2xl rounded-tr-2xl bg-ch-light dark:bg-ch-dark"
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
      >
        <div className="py-2 px-1">
          <Button variant="ghost" onClick={() => setShowShareOptions(false)}>
            <X size={16} color="#ffffff" weight="bold" />
          </Button>
        </div>
        <Separator />
        <div className="px-5 py-5">
          <h3 className="text-xl">Share this decoration</h3>
          <div className="flex items-center space-x-3 mt-5">
            <img
              src={decorationImage?.url}
              alt="decoration image"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{decorationName}</span>
              <span className="font-light text-sm dark:text-gray-300">
                {decorationCity}, {decorationCountry}
              </span>
            </div>
          </div>
          <button
            className="w-full mt-10 px-3 py-3 flex items-center justify-between rounded-lg border dark:border-zinc-700 dark:bg-zinc-800"
            onClick={copyLink}
          >
            <p>Copy Link</p>
            <Copy size={28} className="mr-5 ml-2 dark:text-ch-light" />
          </button>

          <div className="w-full mt-5 rounded-tr-lg rounded-tl-lg border rounded-bl-lg rounded-br-lg dark:border-zinc-700 dark:bg-zinc-800">
            <EmailShareButton
              url={"https://www.christmas-lights.com" + url.pathname}
              subject="Check out this decoration!"
              body="123"
              className="w-full"
              children={
                <div className="w-full flex items-center justify-between px-3 py-3">
                  <p>Email</p>
                  <Envelope
                    size={28}
                    className="mr-5 ml-2 dark:text-ch-light"
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
                <div className="w-full flex items-center justify-between px-3 py-3">
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
                <div className="w-full flex items-center justify-between px-3 py-3">
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
                <div className="w-full flex items-center justify-between px-3 py-3">
                  <p>Twitter</p>
                  <TwitterLogo
                    size={28}
                    className="mr-5 ml-2 dark:text-ch-light"
                  />
                </div>
              }
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
