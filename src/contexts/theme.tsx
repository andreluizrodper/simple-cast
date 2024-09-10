import { createContext, useState } from "react";

type themeType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const themeData: themeType = {
  theme: "light",
  setTheme: (theme: string) => theme,
};

export const ThemeContext = createContext(themeData);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<string>(themeData.theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
