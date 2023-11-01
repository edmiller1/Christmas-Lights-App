import { Button } from "@/components/ui/button";
import { Get_User } from "@/graphql/queries/getUser/types";
import { ShootingStar } from "@phosphor-icons/react";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

interface Props {
  currentUser: User | null;
  user: Get_User | null;
  decorationId: string | undefined;
}

export const RateButton = ({ user, decorationId, currentUser }: Props) => {
  return (
    <>
      {currentUser ? (
        <>
          {user?.ratings.some((rating) => rating.id === decorationId) ? (
            <Button variant="ghost">
              <ShootingStar
                size={20}
                weight="fill"
                className="text-ch-yellow"
              />
              <span className="ml-2">Rate</span>
            </Button>
          ) : (
            <Button variant="ghost">
              <ShootingStar
                size={20}
                className="text-ch-dark dark:text-ch-light"
              />
              <span className="ml-2">Rate</span>
            </Button>
          )}
        </>
      ) : (
        <Link to="/signin">
          <Button variant="ghost">
            <ShootingStar
              size={20}
              className="text-ch-dark dark:text-ch-light"
            />
            <span className="ml-2">Rate</span>
          </Button>
        </Link>
      )}
    </>
  );
};
