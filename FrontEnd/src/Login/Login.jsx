import React, { useState } from "react";
import styles from './Login.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false); 
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPass) {
            setError("Confirm password failed!");
        } else {
            setError("");
            const newUser = { name, email, password };

            try {
                const res = await axios.post("http://localhost:5000/api/user/register", newUser);
                alert(res.data.message);
                setIsRegistered(true); 
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPass("");
            } catch (err) {
                const errorMsg = err.response?.data?.message || "Register failed!";
                alert(errorMsg);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPass("");
            }
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const user = { name, password};
            const res = await axios.post("http://localhost:5000/api/user/login", user, {withCredentials: true});
            alert(res.data.message);
            navigate('/Home/Home');
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Login failed!";
            alert(errorMsg);
        }
    };

    return (
        <div className={styles.logb}>
            <div className={styles.main}>
                <input type="checkbox" id={styles.chk} aria-hidden="true" />

                {!isRegistered && (
                    <div className={styles.signup}>
                        <form>
                            <label htmlFor={styles.chk} aria-hidden="true">Sign up</label>
                            <input
                                className={styles.signupInput}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Username"
                                required
                            />
                            <input
                                className={styles.signupInput}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <input
                                className={styles.signupInput}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <input
                                className={styles.signupInput}
                                type="password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                            <button className={styles.signupButton} type="button" onClick={handleSignUp}>
                                Sign up
                            </button>
                        </form>
                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    </div>
                )}

                {isRegistered && (
                    <div className={styles.login}>
                        <form>
                            <label htmlFor={styles.chk} aria-hidden="true">Login</label>
                            <input
                                className={styles.signupInput}
                                type="email"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="UserName"
                                required
                            />
                            <input
                                className={styles.signupInput}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <button className={styles.signupButton} type="button" onClick={handleSignIn}>
                                Login
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
