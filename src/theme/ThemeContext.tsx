import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";
import { ThemeSwitchContainer, ThemeSwitch } from "../styles/themeStyles";
import { LightMode, DarkMode } from "@mui/icons-material";
import { GlobalStyles } from "../styles/globalStyles"; 

const ThemeContext = createContext({ 
  theme: "light", 
  toggleTheme: () => {}, 
}); 

export const ThemeProviderComponent = ({ children }: { children: ReactNode }) => { 
  const [theme, setTheme] = useState("light"); 

  useEffect(() => { 
    const savedTheme = localStorage.getItem("theme"); 
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []); 

  const toggleTheme = () => { 
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); 
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}> 
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />  
        <ThemeSwitchContainer> 
          {theme === "light" ? <LightMode fontSize="large"/> : <DarkMode fontSize="large"/>}
          <ThemeSwitch checked={theme === "dark"} onChange={toggleTheme} /> 
        </ThemeSwitchContainer>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

