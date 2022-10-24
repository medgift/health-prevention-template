import {useState} from "react";

export default function UserForm({handleSubmit, submitButtonLabel}) {
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
                className="formInput"
                type="text"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            <br/>
            <input
                className="formInput"
                type="password"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                required
            />
            <br/>
            <button
                type="submit"
                className="formButton animatedButton"
            >{submitButtonLabel}</button>
        </form>
    );
}
