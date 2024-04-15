import { Button } from "@/components/ui/button";
import { HouseLine } from "@phosphor-icons/react";

interface Props {
  setIsCreateOpen: (isCreateOpen: boolean) => void;
}

export const CreateButton = ({ setIsCreateOpen }: Props) => {
  return (
    <Button
      variant="outline"
      className="rounded-lg"
      onClick={() => setIsCreateOpen(true)}
    >
      <HouseLine size={20} weight="bold" />
      <span className="ml-1">Create</span>
    </Button>
  );
};
