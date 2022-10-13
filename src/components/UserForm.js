import { useState } from "react";
import {Link} from "react-router-dom";

export default function UserForm({ handleSubmit, submitButtonLabel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  let link;

  if (submitButtonLabel === "Login") {
    link =  <Link to="/register" className="App-link">
              Register
            </Link>;
  } else {
    link =  <Link to="/login" className="App-link">
              Login
            </Link>;
  }

  return (
    <>
        <h2>Health prevention questionnary</h2>
        <form
            onSubmit={(e) => {
                handleSubmit(e, email, password);
            }}
        >
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            <br />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                required
            />
            <br />
            <button type="submit">{submitButtonLabel}</button>
            &nbsp; or &nbsp;
            { link }
        </form>
    </>
  );
}
