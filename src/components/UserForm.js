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
            <div className={"input-group"}>
                <input
                    className="formInput"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <label htmlFor={"email"} className={"input-label"}>Email address</label>
            </div>
            <br/>
            <div className={"input-group"}>
                <input
                    className="formInput"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <label htmlFor={"email"} className={"input-label"}>Password</label>
            </div>
            <br/>
            <button
                type="submit"
                className="formButton animatedButton"
            >{submitButtonLabel}</button>
        </form>
    );
}
