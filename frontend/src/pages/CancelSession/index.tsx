import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { CANCEL_SESSION } from "@/graphql/queries";
import { useNavigate } from "react-router-dom";

export const CancelSession = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState<number | null>(null);

  const { data, loading, error } = useQuery(CANCEL_SESSION, {});

  useEffect(() => {
    if (data && !loading && !error) {
      setCount(5);
    }
    if (error) {
      navigate("/");
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (count !== null && count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (count === 0) {
      // Redirect after countdown finishes
      navigate("/");
    }
  }, [count]);

  return (
    <div className="flex flex-col justify-center items-center text-center h-screen">
      <h1 className="text-2xl">You have cancelled the checkout session</h1>
      {count !== null ? (
        <h2 className="text-lg mt-3">Redirecting in {count}</h2>
      ) : null}
    </div>
  );
};
