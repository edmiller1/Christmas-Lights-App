import { useTheme } from "@/components/ui/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Moon } from "@phosphor-icons/react";
import { useState } from "react";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("vite-ui-theme")
  );

  const changeTheme = () => {
    if (currentTheme === "dark") {
      setCurrentTheme("light");
      setTheme("light");
    } else {
      setCurrentTheme("dark");
      setTheme("dark");
    }
  };

  return (
    <div className="flex justify-between items-center px-2 my-2">
      <div className="flex items-center space-x-2">
        <Moon
          size={20}
          weight="bold"
          className="text-ch-dark dark:text-ch-light"
        />
        <span className="text-sm">Dark Mode</span>
      </div>
      <Switch checked={currentTheme === "dark"} onCheckedChange={changeTheme} />
    </div>
  );
};
