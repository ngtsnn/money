import clsx from "clsx";
import { useTheme } from "context/ThemeContext";
import React, { FC } from "react";
import { Moon, Sun } from "react-feather";

interface IProps {
  className?: string;
}

export const ThemeSwitch: FC<IProps> = ({ className }) => {
  const { theme, toggle } = useTheme();

  return (
    <div
      onClick={toggle}
      className={clsx(
        "w-12 h-6 p-0.5 relative rounded-full border border-solid border-border dark:border-border-dark bg-slate-200 dark:bg-gray-700 cursor-pointer transition-[background] duration-500",
        className
      )}
    >
      <div
        className={clsx(
          "top-0.5 absolute rounded-full w-6 h-6 bg-white dark:bg-gray-800 transition-[left_transform] duration-500",
          theme === "light" ? "left-0.5" : "left-[calc(100%-0.125rem)] -translate-x-full"
        )}
      >
        <div className="absolute top-0 left-0 w-full h-full p-1">
          <Sun className="dark:hidden" size={16} />
          <Moon className="hidden dark:block" size={16} />
        </div>
      </div>
    </div>
  );
};
