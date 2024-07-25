import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "@/graphql/queries/getUser/types";
import { DELETE_ACCOUNT, EDIT_AVATAR, EDIT_NAME } from "@/graphql/mutations";
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
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { getBase64Value } from "@/lib/helpers";
import { Breadcrumbs, SEO } from "@/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { DeleteAccountModal, PersonalInfoLoading } from "../../components";

export const PersonalInfo = () => {
  const { logout, user } = useKindeAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<Get_User | null>(null);
  //@ts-ignore
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  //@ts-ignore
  const [newName, setNewName] = useState<string>("");
  //@ts-ignore
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false);
  //@ts-ignore
  const [newImage, setNewImage] = useState<string>("");
  //@ts-ignore
  const [base64Value, setBase64Value] = useState<string>("");
  //@ts-ignore
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

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

  //@ts-ignore
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

  //@ts-ignore
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

  const [deleteAccount, { loading: deleteAccountLoading }] = useMutation(
    DELETE_ACCOUNT,
    {
      onCompleted: () => {
        setIsDeleteOpen(false);
        toast({
          title: "Success 🎉",
          description:
            "Account deleted successfully! Although we're sad to see you go. 🥺",
        });
        logout();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
    }
  );

  const deleteUserAccount = () => {
    deleteAccount();
  };

  //@ts-ignore
  const editUserName = (name: string) => {
    setIsEditingName(false);
    editName({ variables: { input: { name: name } } });
  };

  //@ts-ignore
  const cancelNameEditing = () => {
    setNewName("");
    setIsEditingName(false);
  };

  //@ts-ignore
  const editUserAvatar = (avatar: string) => {
    setIsEditingAvatar(false);
    editAvatar({
      variables: { input: { image: avatar, imageId: currentUser!.imageId } },
    });
  };

  //@ts-ignore
  const cancelEditingAvatar = () => {
    setNewImage("");
    setBase64Value("");
    setIsEditingAvatar(false);
  };

  //@ts-ignore
  const selectImage = (e: any) => {
    e.preventDefault();

    setNewImage(URL.createObjectURL(e.target.files[0]));
    getBase64Value(e.target.files[0], (imageBase64Value: string) => {
      setBase64Value(imageBase64Value);
    });
  };

  if (getUserLoading || getUserNetworkStatus === NetworkStatus.refetch) {
    return <PersonalInfoLoading />;
  }

  if (deleteAccountLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-5 bg-background">
        <CircleNotch size={96} className="animate-spin" />
        <span className="text-xl font-semibold">Deleting Account...</span>
      </div>
    );
  }

  return (
    <>
      <DeleteAccountModal
        deleteAccountLoading={deleteAccountLoading}
        deleteUserAccount={deleteUserAccount}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
      />
      <SEO
        description="Profile Settings"
        name="Profile Settings"
        title={`${user?.given_name} ${user?.family_name}`}
        type="Profile Settings"
      />
      {/* Mobile */}
      <div className="h-screen px-8 py-5 sm:hidden">
        <div className="flex items-center space-x-3">
          <div role="button" onClick={() => navigate(-1)}>
            <CaretLeft size={24} weight="bold" />
          </div>
          <h2 className="text-2xl font-bold">Personal Info</h2>
        </div>
        <div className="my-8 ml-1">
          <div className="flex items-center justify-between my-6">
            <div className="flex flex-col">
              <span className="font-semibold">Avatar</span>
              <img
                src={user?.picture ?? ""}
                alt="profile"
                className="w-12 h-12 mt-1 rounded-full"
              />
            </div>
            {/* <Button variant="outline" onClick={() => setIsEditingAvatar(true)}>
              Edit
            </Button> */}
          </div>
          {/* {isEditingAvatar ? (
            <div className="flex items-center justify-between my-6">
              <div className="flex flex-col w-full space-y-2">
                <span className="font-semibold">Avatar</span>
                {newImage ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={newImage}
                      alt="new avatar"
                      className="w-12 h-12 mt-1 rounded-full"
                    />
                    <Label className="flex items-center w-1/2 h-10 px-4 mt-2 text-xs border rounded-lg">
                      Choose file
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={selectImage}
                      />
                    </Label>
                  </div>
                ) : (
                  <Label className="flex items-center w-3/4 h-10 px-4 border rounded-lg">
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
                <div className="flex items-center justify-between my-6">
                  <div className="flex flex-col">
                    <span className="font-semibold">Avatar</span>
                    <img
                      src={currentUser?.image}
                      alt="profile"
                      className="w-12 h-12 mt-1 rounded-full"
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
          )} */}
        </div>
        <Separator />
        <div className="my-8 ml-1">
          <div className="flex items-center justify-between my-6">
            <div className="flex flex-col">
              <span className="font-semibold">Name</span>
              <span className="font-light">
                {user?.given_name} {user?.family_name}
              </span>
            </div>
            {/* <Button
              variant="outline"
              onClick={() => {
                setIsEditingName(true);
              }}
            >
              Edit
            </Button> */}
          </div>
          {/* {isEditingName ? (
            <div className="flex items-center justify-between my-6">
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
                <div className="flex items-center justify-between my-6">
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
          )} */}
        </div>
        <Separator />
        <div className="my-8 ml-1">
          <div className="flex items-center justify-between my-6">
            <div className="flex flex-col">
              <span className="font-semibold">Email Address</span>
              <span className="font-light">{user?.email}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex h-[18rem] justify-center items-end w-full">
          <Button
            variant="default"
            className="w-full py-6"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:ml-40 md:ml-40 lg:ml-40 sm:block sm:py-24 sm:min-h-screen sm:w-full 2xl:w-2/3 lg:mx-28 xl:mx-56 2xl:mx-64">
        <Breadcrumbs firstWord="Profile" secondWord="Personal Info" />
        <h1 className="text-4xl font-bold my-7">Personal Info</h1>
        <div className="w-1/2 my-8 ml-1">
          <div className="flex items-center justify-between my-6">
            <div className="flex flex-col space-y-2">
              <span className="font-semibold">Avatar</span>
              <img
                src={user?.picture ?? ""}
                alt="profile"
                className="w-12 h-12 mt-1 rounded-full"
              />
            </div>
            {/* <Button variant="outline" onClick={() => setIsEditingAvatar(true)}>
              Edit
            </Button> */}
          </div>
          {/* {isEditingAvatar ? (
            <div className="flex items-center justify-between my-6">
              <div className="flex flex-col w-full space-y-4">
                <span className="font-semibold">Avatar</span>
                {newImage ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={newImage}
                      alt="new avatar"
                      className="w-12 h-12 mt-1 rounded-full"
                    />
                    <Label className="flex items-center w-32 h-10 px-4 mt-2 text-xs border rounded-lg cursor-pointer">
                      Choose file
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={selectImage}
                      />
                    </Label>
                  </div>
                ) : (
                  <Label className="flex items-center w-32 h-10 px-4 border rounded-lg cursor-pointer">
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
                <div className="flex items-center justify-between my-6">
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold">Avatar</span>
                    <img
                      src={currentUser?.image}
                      alt="profile"
                      className="w-12 h-12 mt-1 rounded-full"
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
          )} */}
        </div>
        <div className="w-1/2">
          <Separator />
        </div>
        <div className="w-1/2 my-8 ml-1">
          <div className="flex items-center justify-between my-6">
            <div className="flex flex-col">
              <span className="font-semibold">Name</span>
              <span className="font-light">
                {user?.given_name} {user?.family_name}
              </span>
            </div>
            {/* <Button
              variant="outline"
              onClick={() => {
                setIsEditingName(true);
              }}
            >
              Edit
            </Button> */}
          </div>
          {/* {isEditingName ? (
            <div className="flex items-center justify-between my-6">
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
                <div className="flex items-center justify-between my-6">
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
          )} */}
        </div>
        <div className="w-1/2">
          <Separator />
        </div>
        <div className="w-1/2 my-8 ml-1">
          <div className="flex items-center justify-between my-6">
            <div className="flex flex-col">
              <span className="font-semibold">Email Address</span>
              <span className="font-light">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Separator />
        </div>
        <div className="flex items-end justify-center w-1/2 h-full mt-32">
          <Button
            variant="default"
            className="w-full py-6"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </>
  );
};
