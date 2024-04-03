import { Link } from "react-router-dom";
import { WarningCircle } from "@phosphor-icons/react";

interface Props {
  verified: boolean | undefined;
  verificationSubmitted: boolean | undefined;
  decorationId: string | undefined;
}

export const VerifiedSection = ({
  verificationSubmitted,
  verified,
  decorationId,
}: Props) => {
  return (
    <>
      {!verified && !verificationSubmitted ? (
        <div className="px-5 py-3 flex space-x-5">
          <WarningCircle
            size={52}
            color="#E23737"
            weight="bold"
            className="w-1/3"
          />
          <div className="flex flex-col text-sm space-y-2">
            <p className="text-lg font-semibold">
              Your decoration is not verified.
            </p>
            <p>
              We make sure all decorations are verified for when users visit
              decorations, they can guarantee that the decoration actually
              exists.
            </p>
            <div className="text-sm">
              You can submit your decoration for verification{" "}
              <Link
                to={`/verify-decoration/${decorationId}`}
                className="text-ch-turquoise underline text-sm"
              >
                here
              </Link>
            </div>
          </div>
        </div>
      ) : verificationSubmitted ? (
        <div className="px-5 py-3 flex space-x-5">
          <WarningCircle
            size={52}
            color="#E23737"
            weight="bold"
            className="w-1/3"
          />
          <div className="flex flex-col text-sm space-y-2">
            <p className="text-lg font-semibold">
              Your decoration is not verified.
            </p>
            <p>
              A submission for verification has been received for this
              decoration.
            </p>
            <div className="text-sm">
              Verification request can take up to 2 days to be resolved.
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
