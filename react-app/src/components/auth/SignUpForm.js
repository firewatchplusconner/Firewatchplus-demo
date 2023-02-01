import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(
                signUp(username, email, password, firstName, lastName)
            );
            if (data) {
                setErrors(data);
            }
        } else {
            setErrors(["Password: Passwords must match."]);
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="pad30lr fdcol w30vw ofhidden h100p aicen">
            <div className="marlrauto mar20b">Sign Up</div>
            <form onSubmit={onSignUp} className="w70p">
                {errors.length > 0 && (
                    <div className="errors-div">
                        {errors.map((error, ind) => (
                            <div key={ind}>{error.split(":")[1]}</div>
                        ))}
                    </div>
                )}
                <div className="fdcol mar20b">
                    <label>User Name *</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={updateUsername}
                        value={username}
                        className="iflight bnone h40px"
                        required
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Email *</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        onChange={updateEmail}
                        value={email}
                        className="iflight bnone h40px"
                        required
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>First Name *</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="first name"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        className="iflight bnone h40px"
                        required
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Last Name *</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="last name"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        className="iflight bnone h40px"
                        required
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Password *</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={updatePassword}
                        value={password}
                        className="iflight bnone h40px"
                        required
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Repeat Password *</label>
                    <input
                        type="password"
                        name="repeat_password"
                        placeholder="repeat password"
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                        className="iflight bnone h40px"
                    ></input>
                </div>
                <div className="jccen mar30t">
                    <button type="submit" className="w100p h50px btndark pad0">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
