import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { MUTATE_NOTIFICATION_SETTINGS } from "@/graphql/mutations";
import {
  MutateNotificationSettings as MutateNotificationSettingsData,
  MutateNotificationSettingsArgs,
} from "@/graphql/mutations/mutateNotificationSettings/types";
import { useLocation, useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { PersonalInfoLoading } from "../PersonalInfo/components";
import { Breadcrumbs } from "@/components";
import { useAuth } from "@/lib/hooks";

export const NotificationSettings = () => {
  const { currentUser } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<Get_User | null>(null);

  const {
    loading: getUserLoading,
    refetch: refetchUser,
    networkStatus: getUserNetworkStatus,
  } = useQuery<GetUserData, GetUserArgs>(GET_USER, {
    variables: { input: { id: state ? state : currentUser?.id } },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data) {
        setUser(data.getUser);
      }
    },
  });

  const [mutateNotificationSettings] = useMutation<
    MutateNotificationSettingsData,
    MutateNotificationSettingsArgs
  >(MUTATE_NOTIFICATION_SETTINGS, {
    onCompleted: () => {
      refetchUser();
    },
  });

  const changeNotificationSetting = (checked: boolean, name: string) => {
    mutateNotificationSettings({
      variables: { input: { name: name, setting: checked } },
    });
  };

  if (getUserLoading || getUserNetworkStatus === NetworkStatus.refetch) {
    return <PersonalInfoLoading />;
  }

  return (
    <>
      <div className="px-8 py-5 min-h-screen sm:hidden">
        <div role="button" className="pb-12" onClick={() => navigate(-1)}>
          <CaretLeft
            size={24}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </div>
        <h2 className="text-2xl font-bold">Notifications Settings</h2>
        <span className="text-xs">
          Get notifications you care about, where you want to see them.
        </span>
        <div className="my-8 ml-1">
          <h3 className="text-lg">On App</h3>
          <p className="text-xs">Notifications that will appear in the app</p>
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col w-full space-y-2">
              <span className="font-semibold text-base">Verification</span>
            </div>
            <Switch
              checked={user?.notifications_on_app_verification}
              onCheckedChange={(checked) =>
                changeNotificationSetting(checked, "onAppVerification")
              }
            />
          </div>
          <Separator />
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col w-full space-y-2">
              <span className="font-semibold text-base">Rating</span>
            </div>
            <Switch
              checked={user?.notifications_on_app_rating}
              onCheckedChange={(checked) =>
                changeNotificationSetting(checked, "onAppRating")
              }
            />
          </div>
          <Separator />
        </div>

        <div className="my-8 ml-1">
          <h3 className="text-lg">By Email</h3>
          <p className="text-xs">Notifications that will be sent via email</p>
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col w-full space-y-2">
              <span className="font-semibold text-base">Verification</span>
            </div>
            <Switch
              checked={user?.notifications_by_email_verification}
              onCheckedChange={(checked) =>
                changeNotificationSetting(checked, "byEmailVerification")
              }
            />
          </div>
          <Separator />
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col w-full space-y-2">
              <span className="font-semibold text-base">Rating</span>
            </div>
            <Switch
              checked={user?.notifications_by_email_rating}
              onCheckedChange={(checked) =>
                changeNotificationSetting(checked, "byEmailRating")
              }
            />
          </div>
          <Separator />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:ml-40 sm:block sm:min-h-screen xl:mx-96 sm:py-24">
        <Breadcrumbs firstWord="Profile" secondWord="Notification Settings" />
        <h1 className="mt-7 font-bold text-4xl">Notification Settings</h1>
        <span className="text-sm mb-7">
          Get notifications you care about, where you want to see them.
        </span>
        <div className="w-1/2 my-8 ml-1">
          <h3 className="text-lg">On App</h3>
          <p className="text-xs">Notifications that will appear in the app</p>
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col w-full space-y-2">
              <span className="font-semibold text-base">Verification</span>
            </div>
            <Switch
              checked={user?.notifications_on_app_verification}
              onCheckedChange={(checked) =>
                changeNotificationSetting(checked, "onAppVerification")
              }
            />
          </div>
          <Separator />
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col w-full space-y-2">
              <span className="font-semibold text-base">Rating</span>
            </div>
            <Switch
              checked={user?.notifications_on_app_rating}
              onCheckedChange={(checked) =>
                changeNotificationSetting(checked, "onAppRating")
              }
            />
          </div>
          <Separator />
        </div>
        <div className="w-1/2 my-8 ml-1">
          <h3 className="text-lg">By Email</h3>
          <p className="text-xs">Notifications that will be sent via email</p>
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col w-full space-y-2">
              <span className="font-semibold text-base">Verification</span>
            </div>
            <Switch
              checked={user?.notifications_by_email_verification}
              onCheckedChange={(checked) =>
                changeNotificationSetting(checked, "byEmailVerification")
              }
            />
          </div>
          <Separator />
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col w-full space-y-2">
              <span className="font-semibold text-base">Rating</span>
            </div>
            <Switch
              checked={user?.notifications_by_email_rating}
              onCheckedChange={(checked) =>
                changeNotificationSetting(checked, "byEmailRating")
              }
            />
          </div>
          <Separator />
        </div>
      </div>
    </>
  );
};
