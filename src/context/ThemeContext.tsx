import { FC, PropsWithChildren, createContext, useContext, useState } from "react";

export type SupportedTheme = "light" | "dark";

interface IThemeContext {
  theme: SupportedTheme;
  toggle: () => any;
  setTheme: (theme: SupportedTheme) => any;
}

const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  toggle: () => {},
  setTheme: () => {},
});

const getInitTheme = () => {
  const isDark =
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return isDark ? "dark" : "light";
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const init = getInitTheme();
  const [theme, setTheme] = useState<SupportedTheme>(init);

  const updateTheme = (_theme: SupportedTheme) => {
    localStorage?.setItem("theme", _theme);
    if (_theme === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(_theme)
  }

  const toggle = () => {
    setTheme((old) => {
      const newTheme = old === "dark" ? "light" : "dark";
      localStorage?.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
