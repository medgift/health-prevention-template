import React from "react";

export const ThemeContext = React.createContext({
    theme: null,
    toggleTheme: () => {}}
);


/* Themes to use in the App */
export const themes = {
    light: {
        background: "#fefefe",
        foreground: "#333333",
        
    },
    dark: {
        background: "#282c34",
        foreground: "white",
    },
};