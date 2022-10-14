import React from "react";

/* ThemeContext that will be used by the App */
export const ThemeContext = React.createContext({
    theme: null,
    toggleTheme: () => {},
});

/* Themes to use in the App */
export const themes = {
    light: {
        background: "#fefefe",
        foreground: "#333333",
        bookBackground: "#efefef",
    },
    dark: {
        background: "#282c34",
        foreground: "white",
        bookBackground: "transparent",
    },
};
