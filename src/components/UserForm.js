import {useState} from "react";
import {Link} from "react-router-dom";
import showPwdImg from '../img/show-password.svg';
import hidePwdImg from '../img/hide-password.svg';

export default function UserForm({handleSubmit, submitButtonLabel}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPwd, setIsShowPwd] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    let link;

    if (submitButtonLabel === "Login") {
        link = <Link to="/register" className="App-link">
            Register
        </Link>;
    } else {
        link = <Link to="/login" className="App-link">
            Login
        </Link>;
    }

    return (<>
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
            <br/>
            <div className="container-sh-pwd">
                <input
                    type={isShowPwd ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <img
                    title={isShowPwd ? "Hide password" : "Show password"}
                    src={isShowPwd ? hidePwdImg : showPwdImg}
                    onClick={() => setIsShowPwd(prevState => !prevState)}
                />
            </div>
            <br/>
            <button type="submit">{submitButtonLabel}</button>
            &nbsp; or &nbsp;
            {link}
        </form>
    </>);
}
