import { BrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import {ThemeContext} from "./ThemeContext";

class AppWrapper extends React.Component {
  /* Initialize state with a default theme */
  constructor() {
      super();
      this.state = { theme: "light" };
  }



  /* Toggle theme method */
  toggleTheme = () => {
      this.setState((prevState) => ({
          theme: prevState.theme === "dark" ? "light" : "dark",
      }));
      console.log("Current Theme : ", this.state.theme);
  };

  /*
  Render our App component, + wrapped by a ThemeContext Provider:
  The value contains the theme (coming from state) and the
  toggleTheme method allowing consumers of the context to
  update the current theme.
   */
  render() {
      return (
          <ThemeContext.Provider
              value={{ theme: this.state.theme,
                  toggleTheme: this.toggleTheme }}
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeContext.Provider>
      );
  }
}

export default AppWrapper;
