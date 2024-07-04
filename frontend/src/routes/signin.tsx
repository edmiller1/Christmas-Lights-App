import { SignIn } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: () => <SignIn />,
});
