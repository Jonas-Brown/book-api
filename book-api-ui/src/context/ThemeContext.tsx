import { createContext, type ReactNode, useState } from "react";

type ThemeType = "light" | "dark";

type props = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: ThemeType;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggle: () => {},
});

const ThemeProvider = ({ children }: props) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggle = (): void => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;
};

export { ThemeProvider, ThemeContext };
