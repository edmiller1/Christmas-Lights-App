import { useMutation, useQuery } from "@apollo/client";
import { GET_DECORATION } from "@/graphql/queries/";
import { SUBMIT_DECORATION_FOR_VERIFICATION } from "@/graphql/mutations";
import {
  SubmitDecorationForVerification as SubmitDecorationForVerificationData,
  SubmitDecorationForVerificationArgs,
} from "@/graphql/mutations/submitDecorationForVerification/types";

import {
  GetDecoration as GetDecorationData,
  GetDecorationArgs,
} from "@/graphql/queries/getDecoration/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/ChristmasLights-House-Logo.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleNotch, Files } from "@phosphor-icons/react";
import { useState } from "react";
import { NotFound } from "..";
import { getBase64Value } from "@/lib/helpers";
import { AlreadySubmittedModal, VerifyDecorationLoading } from "./components";
import { useToast } from "@/components/ui/use-toast";
import { useUserData } from "@/lib/hooks";

export const VerifyDecoration = () => {
  const { decorationId } = useParams();
  const currentUser = useUserData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
  const [file, setFile] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string>("");
  const [base64Value, setBase64Value] = useState<string>("");

  const {
    data: getDecorationData,
    loading: getDecorationLoading,
    error: getDecorationError,
  } = useQuery<GetDecorationData, GetDecorationArgs>(GET_DECORATION, {
    variables: { input: { id: decorationId! } },
    onCompleted: (data) => {
      if (data.getDecoration.verification_submitted) {
        setAlreadySubmitted(true);
      }
    },
  });

  const decoration = getDecorationData?.getDecoration
    ? getDecorationData?.getDecoration
    : null;

  const [
    submitDecorationForVerification,
    { loading: submitDecorationForVerificationLoading },
  ] = useMutation<
    SubmitDecorationForVerificationData,
    SubmitDecorationForVerificationArgs
  >(SUBMIT_DECORATION_FOR_VERIFICATION, {
    onCompleted: () => {
      toast({
        variant: "success",
        title: "Success 🎉",
        description: "Verification request sent successfully!",
      });
      setTimeout(() => {
        navigate(`/decoration/${decorationId}`);
      }, 1500);
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send verification request. Please try again.",
      });
    },
  });

  const uploadFile = (e: any) => {
    setFileName(e.target.files[0].name);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    getBase64Value(e.target.files[0], (imageBase64Value) => {
      setBase64Value(imageBase64Value);
    });
  };

  const submitDecoration = () => {
    submitDecorationForVerification({
      variables: { input: { document: base64Value, id: decorationId! } },
    });
  };

  if (
    (decoration && currentUser && decoration.creator_id !== currentUser.uid) ||
    getDecorationError
  ) {
    return <NotFound />;
  }

  if (getDecorationLoading) {
    return <VerifyDecorationLoading />;
  }

  if (submitDecorationForVerificationLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <CircleNotch size={80} color="#5AC18A" className="animate-spin" />
        <span className="text-lg">Sending Verification Request...</span>
      </div>
    );
  }
  return (
    <>
      <AlreadySubmittedModal
        alreadySubmitted={alreadySubmitted}
        setAlreadySubmitted={setAlreadySubmitted}
        decorationId={decorationId}
      />
      {/* Mobile */}
      <div className="min-h-screen sm:hidden">
        <div className="w-full pt-2">
          <div className="h-14 border-b-2 dark:border-black">
            <Link to="/" className="">
              <img src={logo} alt="logo" className="h-12" />
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center mx-5 space-y-3">
          <h1 className="text-3xl font-semibold">Verify Decoration</h1>
          <div className="p-4 flex items-center border rounded-xl space-x-3">
            <img
              src={decoration?.images[0].url}
              alt="Christmas decoration"
              className="h-24 w-24 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{decoration?.name}</span>
              <span className="text-xs">{decoration?.address}</span>
            </div>
          </div>
          <div className="text-base">
            <p className="py-3">
              Before your decoration can be publicly available, you will have to
              verify the decoration's address.
            </p>
            <Separator />
            <p className="py-3">
              In order to verify a decoration, you will have to upload a
              document that includes your <strong>name</strong> (as it is
              displayed in your profile) and the <strong>address</strong> of the
              decoration you wish to have verified.
            </p>
            <Separator />
          </div>
          <div className="relative flex flex-col items-center justify-center w-full h-1/2 py-4 rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400">
            <label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={uploadFile}
              />
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="file preview"
                  className="w-2/3 h-1/3 m-auto rounded-lg mb-2 object-cover"
                />
              ) : (
                <Files size={96} color="#6b7280" weight="thin" />
              )}
            </label>
            {fileName ? (
              <span className="text-gray-400">{fileName}</span>
            ) : (
              <span className="text-gray-400">JPEG or PNG only</span>
            )}
          </div>
        </div>
        <nav className="fixed shadow w-full max-w-[560px] h-18 bottom-0 left-0 right-0 z-10 flex justify-center items-center dark:bg-zinc-900 dark:border-t dark:border-black sm:hidden">
          <Button
            className="w-full mx-5 my-5 py-8 rounded-xl text-lg"
            disabled={!file}
            onClick={submitDecoration}
          >
            Submit
          </Button>
        </nav>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:h-full">
        <div className="flex items-center space-x-40 mx-96 my-24">
          <div className="w-1/2">
            <h1 className="text-3xl font-semibold pb-5">Verify Decoration</h1>
            <Separator />
            <div className="text-base">
              <p className="py-5">
                Before your decoration can be publicly available, you will have
                to verify the decoration's address.
              </p>
              <Separator />
              <p className="py-5">
                In order to verify a decoration, you will have to upload a
                document that includes your <strong>name</strong> (as it is
                displayed in your profile) and the <strong>address</strong> of
                the decoration you wish to have verified.
              </p>
              <Separator />
            </div>
            <div className="relative flex flex-col items-center justify-center w-full h-72 py-6 rounded-lg border-2 border-dashed border-gray-300 text-center cursor-pointer hover:border-gray-400">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={uploadFile}
                />
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="file preview"
                    className="w-1/3 m-auto rounded-lg mb-2 object-cover"
                  />
                ) : (
                  <Files size={96} color="#6b7280" weight="thin" />
                )}
              </label>
              {fileName ? (
                <span className="text-gray-400">{fileName}</span>
              ) : (
                <span className="text-gray-400">JPEG or PNG only</span>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <img
              src={decoration?.images[0].url}
              alt="Christmas decoration"
              className="w-64 h-64 object-cover rounded-tr-lg rounded-tl-lg"
            />
            <div className="flex flex-col items-start border-gray-400 border-b border-r border-l rounded-bl-lg rounded-br-lg w-64 px-3 py-3">
              <span className="font-semibold">{decoration?.name}</span>
              <span className="text-xs">{decoration?.address}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center w-full px-96 border-t">
          <Button disabled={!file} className="mt-4" onClick={submitDecoration}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};
