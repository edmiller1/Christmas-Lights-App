import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVertical } from "@phosphor-icons/react";

interface Props {
  setIsReportDecorationOpen: (isReportDecorationOpen: boolean) => void;
}

export const DecorationMenu = ({ setIsReportDecorationOpen }: Props) => {
  return (
    <>
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full focus:outline-none"
            >
              <DotsThreeVertical
                size={28}
                weight="bold"
                className="text-ch-dark dark:text-ch-light"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-5">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsReportDecorationOpen(true)}
            >
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full focus:outline-none"
            >
              <DotsThreeVertical
                size={28}
                weight="bold"
                className="text-ch-dark dark:text-ch-light"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-24 cursor-pointer">
            <DropdownMenuItem onClick={() => setIsReportDecorationOpen(true)}>
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
