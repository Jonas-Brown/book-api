import { type ReactNode, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export type ThemeType = "light" | "dark";

type props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: props) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggle = (): void => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;
};
