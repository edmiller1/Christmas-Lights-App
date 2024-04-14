import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { EDIT_AVATAR, EDIT_NAME } from "@/graphql/mutations";
import {
  EditName as EditNameData,
  EditNameArgs,
} from "@/graphql/mutations/editName/types";
import {
  EditAvatar as EditAvatarData,
  EditAvatarArgs,
} from "@/graphql/mutations/editAvatar/types";
import { useLocation, useNavigate } from "react-router-dom";
import { CaretLeft, CircleNotch } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBase64Value } from "@/lib/helpers";
import { Breadcrumbs, SEO } from "@/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { PersonalInfoLoading } from "../../components";

export const PersonalInfo = () => {
  const { getToken, user } = useKindeAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<string>("");
  const [base64Value, setBase64Value] = useState<string>("");

  const {
    loading: getUserLoading,
    refetch: refetchUser,
    networkStatus: getUserNetworkStatus,
  } = useQuery<GetUserData, GetUserArgs>(GET_USER, {
    variables: { input: { id: state ? state : user?.id } },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data) {
        setCurrentUser(data.getUser);
      }
    },
  });

  const [editName, { loading: editNameLoading }] = useMutation<
    EditNameData,
    EditNameArgs
  >(EDIT_NAME, {
    onCompleted() {
      toast({
        title: "Success 🎉",
        description: "Changed name successfully!",
      });
      refetchUser();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: "Failed to change name. Please try again.",
      });
    },
  });

  const [editAvatar, { loading: editAvatarLoading }] = useMutation<
    EditAvatarData,
    EditAvatarArgs
  >(EDIT_AVATAR, {
    onCompleted() {
      toast({
        title: "Success 🎉",
        description: "Changed avatar successfully!",
      });
      refetchUser();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: "Failed to change avatar. Please try again.",
      });
      setNewImage("");
    },
  });

  const editUserName = (name: string) => {
    setIsEditingName(false);
    editName({ variables: { input: { name: name } } });
  };

  const cancelNameEditing = () => {
    setNewName("");
    setIsEditingName(false);
  };

  const editUserAvatar = (avatar: string) => {
    setIsEditingAvatar(false);
    editAvatar({
      variables: { input: { image: avatar, imageId: currentUser!.imageId } },
    });
  };

  const cancelEditingAvatar = () => {
    setNewImage("");
    setBase64Value("");
    setIsEditingAvatar(false);
  };

  const selectImage = (e: any) => {
    e.preventDefault();

    setNewImage(URL.createObjectURL(e.target.files[0]));
    getBase64Value(e.target.files[0], (imageBase64Value: string) => {
      setBase64Value(imageBase64Value);
    });
  };

  const hasSession = async () => {
    const token = await getToken();
    if (!token) {
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    hasSession();
  }, [getToken]);

  if (getUserLoading || getUserNetworkStatus === NetworkStatus.refetch) {
    return <PersonalInfoLoading />;
  }

  return (
    <>
      <SEO
        description="Profile Settings"
        name="Profile Settings"
        title={`${currentUser?.name}`}
        type="Profile Settings"
      />
      {/* Mobile */}
      <div className="px-8 py-5 h-screen sm:hidden">
        <div role="button" className="pb-12" onClick={() => navigate(-1)}>
          <CaretLeft
            size={24}
            weight="bold"
            className="text-ch-dark dark:text-ch-light"
          />
        </div>
        <h2 className="text-2xl font-bold">Personal Info</h2>
        <div className="my-8 ml-1">
          {isEditingAvatar ? (
            <div className="my-6 flex items-center justify-between">
              <div className="flex flex-col w-full space-y-2">
                <span className="font-semibold">Avatar</span>
                {newImage ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={newImage}
                      alt="new avatar"
                      className="mt-1 rounded-full w-12 h-12"
                    />
                    <Label className="h-10 w-1/2 rounded-lg border flex items-center text-xs px-4 mt-2">
                      Choose file
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={selectImage}
                      />
                    </Label>
                  </div>
                ) : (
                  <Label className="h-10 w-3/4 rounded-lg border flex items-center px-4">
                    Choose file
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={selectImage}
                    />
                  </Label>
                )}
              </div>
              <div className="flex items-center mt-8 space-x-3">
                <Button
                  variant="outline"
                  onClick={() => editUserAvatar(base64Value)}
                >
                  Save
                </Button>
                <Button variant="outline" onClick={cancelEditingAvatar}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              {editAvatarLoading ? (
                <div>
                  <CircleNotch
                    size={32}
                    weight="bold"
                    className="text-ch-dark dark:text-ch-light animate-spin"
                  />
                </div>
              ) : (
                <div className="my-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold">Avatar</span>
                    <img
                      src={currentUser?.image}
                      alt="profile"
                      className="mt-1 rounded-full w-12 h-12"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingAvatar(true)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <Separator />
        <div className="my-8 ml-1">
          {isEditingName ? (
            <div className="my-6 flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <span className="font-semibold">Name</span>
                <Input
                  type="text"
                  placeholder={currentUser?.name}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="flex items-center mt-8 space-x-3">
                <Button
                  variant="outline"
                  disabled={newName.length === 0 || editNameLoading}
                  onClick={() => editUserName(newName.trim())}
                >
                  Save
                </Button>
                <Button variant="outline" onClick={cancelNameEditing}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              {editNameLoading ? (
                <div>
                  <CircleNotch
                    size={32}
                    weight="bold"
                    className="text-ch-dark dark:text-ch-light animate-spin"
                  />
                </div>
              ) : (
                <div className="my-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold">Name</span>
                    <span className="font-light">{currentUser?.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditingName(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <Separator />
        <div className="my-8 ml-1">
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-semibold">Email Address</span>
              <span className="font-light">{currentUser?.email}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex h-[26rem] justify-center items-end w-full">
          <Button variant="default" className="w-full py-6">
            Delete Account
          </Button>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:ml-40 sm:block sm:py-24 sm:min-h-screen xl:mx-96">
        <Breadcrumbs firstWord="Profile" secondWord="Personal Info" />
        <h1 className="my-7 font-bold text-4xl">Personal Info</h1>
        <div className="w-1/2 my-8 ml-1">
          {isEditingAvatar ? (
            <div className="my-6 flex items-center justify-between">
              <div className="flex flex-col w-full space-y-4">
                <span className="font-semibold">Avatar</span>
                {newImage ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={newImage}
                      alt="new avatar"
                      className="mt-1 rounded-full w-12 h-12"
                    />
                    <Label className="h-10 w-32 rounded-lg border flex items-center text-xs px-4 mt-2 cursor-pointer">
                      Choose file
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={selectImage}
                      />
                    </Label>
                  </div>
                ) : (
                  <Label className="h-10 w-32 rounded-lg border flex items-center px-4 cursor-pointer">
                    Choose file
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={selectImage}
                    />
                  </Label>
                )}
              </div>
              <div className="flex items-center mt-8 space-x-3">
                <Button
                  variant="outline"
                  onClick={() => editUserAvatar(base64Value)}
                  disabled={!newImage}
                >
                  Save
                </Button>
                <Button variant="outline" onClick={cancelEditingAvatar}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              {editAvatarLoading ? (
                <div>
                  <CircleNotch
                    size={32}
                    weight="bold"
                    className="text-ch-dark dark:text-ch-light animate-spin"
                  />
                </div>
              ) : (
                <div className="my-6 flex items-center justify-between">
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold">Avatar</span>
                    <img
                      src={currentUser?.image}
                      alt="profile"
                      className="mt-1 rounded-full w-12 h-12"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingAvatar(true)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-1/2">
          <Separator />
        </div>
        <div className="w-1/2 my-8 ml-1">
          {isEditingName ? (
            <div className="my-6 flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <span className="font-semibold">Name</span>
                <Input
                  type="text"
                  placeholder={currentUser?.name}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="flex items-center mt-8 space-x-3">
                <Button
                  variant="outline"
                  disabled={newName.length === 0 || editNameLoading}
                  onClick={() => editUserName(newName.trim())}
                >
                  Save
                </Button>
                <Button variant="outline" onClick={cancelNameEditing}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              {editNameLoading ? (
                <div>
                  <CircleNotch
                    size={32}
                    weight="bold"
                    className="text-ch-dark dark:text-ch-light animate-spin"
                  />
                </div>
              ) : (
                <div className="my-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold">Name</span>
                    <span className="font-light">{currentUser?.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditingName(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-1/2">
          <Separator />
        </div>
        <div className="w-1/2 my-8 ml-1">
          <div className="my-6 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-semibold">Email Address</span>
              <span className="font-light">{currentUser?.email}</span>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Separator />
        </div>
        <div className="flex h-full mt-32 justify-center items-end w-1/2">
          <Button variant="default" className="w-full py-6">
            Delete Account
          </Button>
        </div>
      </div>
    </>
  );
};
