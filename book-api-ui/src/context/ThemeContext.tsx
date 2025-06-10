import { createContext } from "react";
import type { ThemeType } from "./ThemeProvider";

type ThemeContextType = {
  theme: ThemeType;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggle: () => {},
});
