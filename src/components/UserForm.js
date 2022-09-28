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
    </form>
  );
}
