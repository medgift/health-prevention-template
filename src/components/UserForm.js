import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import showPwdImg from '../img/show-password.svg';
import hidePwdImg from '../img/hide-password.svg';

export default function UserForm({handleSubmit, submitButtonLabel}) {

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isShowPwd, setIsShowPwd] = useState(false);
    const [error, setError] = useState("");

    const handleLastnameChange = (e) => setLastname(e.target.value);
    const handleFirstnameChange = (e) => setFirstname(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePasswordConfirmChange = (e) => setPasswordConfirm(e.target.value);

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

    const validateInput = e => {
        if (!(password === passwordConfirm)) {
            setError("Confirm password is not matched!")
        } else {
            setError(null)
        }
    }

    useEffect(() => {
        validateInput()
    }, [error])

    return (
        <>
            <form
                onSubmit={(e) => {
                    handleSubmit(e, email, password, lastname, firstname);
                }}
            >

                {submitButtonLabel === "Login" ?
                    <>
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
                    </>
                    :
                    <>
                        <input
                            type="text"
                            placeholder="firstname"
                            value={firstname}
                            onChange={handleFirstnameChange}
                            required
                        />
                        <br/>
                        <input
                            type="text"
                            placeholder="lastname"
                            value={lastname}
                            onChange={handleLastnameChange}
                            required
                        />
                        <br/>
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
                        <div className="container-sh-pwd">
                            <input
                                type={isShowPwd ? "text" : "password"}
                                placeholder="password confirm"
                                value={passwordConfirm}
                                onChange={handlePasswordConfirmChange}
                                onKeyUp={validateInput}
                                required
                            />
                            <img
                                title={isShowPwd ? "Hide password" : "Show password"}
                                src={isShowPwd ? hidePwdImg : showPwdImg}
                                onClick={() => setIsShowPwd(prevState => !prevState)}
                            />
                            {error && <span className="error">{error}</span>}
                        </div>
                    </>
                }
                <button type="submit">{submitButtonLabel}</button>
                &nbsp; or &nbsp;
                {link}
            </form>
        </>);
}
