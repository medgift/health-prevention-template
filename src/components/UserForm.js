import { useState } from "react";

export default function UserForm({ handleSubmit, submitButtonLabel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, email, password);
      }}
    >
      <input
        className="email_input"
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <br />
      <input
        className="password_input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <br/>
      <button className="btn btn_submit" type="submit">{submitButtonLabel}</button>
    </form>
  );
}
