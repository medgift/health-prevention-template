import { BrowserRouter } from "react-router-dom";
import App from "./App";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
