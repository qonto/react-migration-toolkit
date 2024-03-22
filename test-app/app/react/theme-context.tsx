import {
  createContext,
  type ReactNode,
  type PropsWithChildren,
  useContext,
} from "react";

type Theme = {
  current: "light" | "dark";
};

interface ThemeContextProps extends PropsWithChildren {
  theme: Theme;
}

export const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({
  theme,
  children,
}: ThemeContextProps): ReactNode {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
