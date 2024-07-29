import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export const PremiumDialog = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Dialog defaultOpen onOpenChange={() => navigate(-1)}>
        <DialogContent className="p-0">
          <DialogHeader className="p-2">
            <img
              src="https://images.unsplash.com/flagged/photo-1480412904173-931fd2ecfccb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="object-cover object-center opacity-50 h-2/3 bg-gradient-to-b from-transparent to-black"
            />
            <DialogTitle className="text-2xl">Get Premium</DialogTitle>
            <DialogDescription>
              Create and explore more Christmas decorations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="p-2">
            <Button onClick={() => navigate("/premium")}>Get started</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
