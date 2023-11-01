import { useUser } from "@supabase/auth-helpers-react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "./graphql/mutations";
import { GET_USER } from "./graphql/queries";
import {
  CreateUser as CreateUserData,
  CreateUserArgs,
} from "./graphql/mutations/createUser/types";
import {
  GetUser as GetUserData,
  GetUserArgs,
  Get_User,
} from "./graphql/queries/getUser/types";
import { AppHeader } from "./components";
import { useEffect, useState } from "react";
import { AppHeaderLoading } from "./components/AppHeader/components";
import { Outlet } from "react-router-dom";

function App() {
  const currentUser = useUser();
  const [user, setUser] = useState<Get_User | null>(null);

  const [createUser] = useMutation<CreateUserData, CreateUserArgs>(
    CREATE_USER,
    {
      onCompleted(data) {
        getUser({ variables: { input: { id: data.createUser.id } } });
      },
    }
  );

  const [getUser, { loading: getUserLoading }] = useLazyQuery<
    GetUserData,
    GetUserArgs
  >(GET_USER, {
    onCompleted: (data) => {
      setUser(data.getUser);
    },
  });

  useEffect(() => {
    if (
      currentUser &&
      localStorage.getItem(import.meta.env.VITE_USER_TOKEN_ID)!
    ) {
      const token: any = localStorage.getItem(
        import.meta.env.VITE_USER_TOKEN_ID
      )!;
      const tmpToken = JSON.parse(token);
      sessionStorage.setItem("token", tmpToken.access_token);

      createUser({
        variables: {
          input: {
            id: currentUser.id,
            createdAt: currentUser.created_at,
            email: currentUser.user_metadata.email,
            image: currentUser.user_metadata.picture,
            name: currentUser.user_metadata.full_name,
            provider: currentUser.app_metadata.provider,
            token: tmpToken.access_token,
          },
        },
      });
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen">
      {window.location.pathname.includes("decoration") ? (
        <div className="hidden sm:block">
          {getUserLoading ? <AppHeaderLoading /> : <AppHeader user={user} />}
        </div>
      ) : (
        <>{getUserLoading ? <AppHeaderLoading /> : <AppHeader user={user} />}</>
      )}

      <Outlet />
    </div>
  );
}

export default App;
