import { Button } from "@/components/ui/button";
import { HouseLine } from "@phosphor-icons/react";

export const CreateButton = () => {
  return (
    <Button variant="outline" className="rounded-lg">
      <HouseLine
        size={20}
        weight="bold"
        className="text-ch-dark dark:text-ch-light"
      />
      <span className="ml-1">Create</span>
    </Button>
  );
};
