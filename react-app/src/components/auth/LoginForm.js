import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const demoLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login("demo@aa.io", "password"));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="pad30lr fdcol w30vw ofhidden h100p aicen">
            <h1 className="marlrauto mar20b">Login</h1>
            <form onSubmit={onLogin} className='w70p'>
                {errors.length > 0 && <div className="errors-div">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>}
                <div className="fdcol mar20b">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={updateEmail}
                        className="iflight bnone h40px"
                        required
                    />
                </div>
                <div className="fdcol mar20b">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={updatePassword}
                        className="iflight bnone h40px"
                        required
                    />
                    <div className="jccen mar30t">
                        <button
                            type="submit"
                            className="w100p h50px btndark pad0"
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="jccen mar30t">
                    <button
                        type="submit"
                        onClick={demoLogin}
                        className="w100p h50px btndark pad0"
                    >
                        Demo Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
