import { KindeUser } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { AppHeader } from "@/components";
import { Get_User } from "@/graphql/queries/getUser/types";

interface Props {
  isAuthenticated: boolean;
  user: KindeUser | undefined;
  logout: () => Promise<void>;
  login: (options?: any) => Promise<void>;
  currentUser: Get_User | null;
  currentPlace: string;
}

export const Hero = ({ currentUser, isAuthenticated }: Props) => {
  return (
    <div className="bg-background">
      <AppHeader currentUser={currentUser} isAuthenticated={isAuthenticated} />
      <div className="relative min-h-screen px-6 isolate pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-2xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1acd81] to-[#dc2626] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Explore amazing Christmas decorations
            </h1>
            <p className="mt-6 text-lg leading-8">
              Bring the holiday cheer to life! Create, share, rate and discover
              stunning Christmas decorations.
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              <Input
                className="h-16 text-xl rounded-full"
                placeholder="Search by city, country or decoration name"
              />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-2xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1acd81] to-[#dc2626] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
