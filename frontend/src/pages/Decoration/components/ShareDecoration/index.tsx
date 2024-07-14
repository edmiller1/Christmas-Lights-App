import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Copy,
  Envelope,
  FacebookLogo,
  MessengerLogo,
  Share,
  TwitterLogo,
} from "@phosphor-icons/react";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
} from "react-share";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Props {
  decorationImage: { id: string; url: string } | undefined;
  decorationName: string | undefined;
  decorationCountry: string | undefined;
  decorationCity: string | undefined;
}

export const ShareDecoration = ({
  decorationImage,
  decorationCity,
  decorationCountry,
  decorationName,
}: Props) => {
  const url = useLocation();
  const { toast } = useToast();

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      "https://www.christmaslightsapp.com/" + url.pathname
    );
    toast({
      title: "Success 🎉",
      description: "Link copied to clipboard",
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="absolute right-16 top-3 px-1 py-1 bg-white rounded-full shadow-lg">
          <Share size={24} color="#000000" weight="bold" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="p-4 focus:outline-none">
        <DrawerHeader className="flex justify-start">
          <h3 className="text-xl">Share this decoration</h3>
        </DrawerHeader>
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
          className="w-full mt-10 px-3 py-3 flex items-center justify-between rounded-lg border bg-background"
          onClick={copyLink}
        >
          <p>Copy Link</p>
          <Copy
            size={28}
            className="mr-5 ml-2 text-ch-dark dark:text-ch-light"
          />
        </button>
        <div className="w-full mt-5 rounded-tr-lg rounded-tl-lg border rounded-bl-lg rounded-br-lg bg-background">
          <EmailShareButton
            url={"https://www.christmas-lights.com" + url.pathname}
            subject="Check out this decoration!"
            body="123"
            className="w-full"
            children={
              <div className="w-full flex items-center justify-between px-3 py-3">
                <p>Email</p>
                <Envelope size={28} className="mr-5 ml-2 dark:text-ch-light" />
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
      </DrawerContent>
    </Drawer>
  );
};
