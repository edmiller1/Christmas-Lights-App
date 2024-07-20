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
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleNotch, Files } from "@phosphor-icons/react";
import { useState } from "react";
import { NotFound } from "..";
import { getBase64Value } from "@/lib/helpers";
import { AlreadySubmittedModal, VerifyDecorationLoading } from "./components";
import { useToast } from "@/components/ui/use-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { SEO } from "@/components";

export const VerifyDecoration = () => {
  const { decorationId } = useParams();
  const { user } = useKindeAuth();
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
    (decoration && user && decoration.creator_id !== user.id) ||
    getDecorationError
  ) {
    return <NotFound />;
  }

  if (getDecorationLoading) {
    return <VerifyDecorationLoading />;
  }

  if (submitDecorationForVerificationLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CircleNotch size={80} color="#5AC18A" className="animate-spin" />
        <span className="text-lg">Sending Verification Request...</span>
      </div>
    );
  }
  return (
    <>
      <SEO
        description={`Verify Decoration - ${decoration?.name}`}
        name="Verify Decoration"
        title={`Verify Decoration - ${decoration?.name}`}
        type="Verify Decoration"
      />
      <AlreadySubmittedModal
        alreadySubmitted={alreadySubmitted}
        setAlreadySubmitted={setAlreadySubmitted}
        decorationId={decorationId}
      />
      {/* Mobile */}
      <div className="h-full sm:hidden">
        <div className="w-full pt-2">
          <div className="border-b-2 h-14">
            <Link to="/" className="">
              <img src={logo} alt="logo" className="h-12" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center mx-5 mt-8 mb-5 space-y-3">
          <h1 className="text-3xl font-semibold">Verify Decoration</h1>
          <div className="flex items-center p-4 space-x-3 border rounded-xl">
            <img
              src={decoration?.images[0].url}
              alt="Christmas decoration"
              className="object-cover w-24 h-24 rounded-lg"
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
          <div className="relative flex flex-col items-center justify-center w-full h-64 py-4 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
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
                  className="object-cover w-2/3 m-auto mb-2 rounded-lg h-1/3"
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
          <Button
            className="w-full py-8 text-lg rounded-xl"
            disabled={!file}
            onClick={submitDecoration}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block sm:min-h-screen">
        <div className="flex items-center py-24 space-x-40 sm:mx-3 md:mx-5 lg:mx-32 xl:mx-64 2xl:mx-96">
          <div className="w-1/2">
            <h1 className="pb-5 text-3xl font-semibold">Verify Decoration</h1>
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
            <div className="relative flex flex-col items-center justify-center w-full py-6 mt-5 text-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-72 hover:border-gray-400">
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
                    className="object-cover w-1/3 m-auto mb-2 rounded-lg"
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
              className="object-cover w-64 h-64 rounded-tl-lg rounded-tr-lg"
            />
            <div className="flex flex-col items-start w-64 px-3 py-3 border-b border-l border-r border-gray-400 rounded-bl-lg rounded-br-lg dark:border-black">
              <span className="font-semibold">{decoration?.name}</span>
              <span className="text-xs">{decoration?.address}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-full border-t px-96">
          <Button disabled={!file} className="mt-4" onClick={submitDecoration}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};
