import React, { useContext, useRef, useState } from "react";
import AuthContext from "../contexts/auth-context";
import styles from "./signup.module.css";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const { signup } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true); // done so that use doesn't create multiple accounts while current
      //account is being created.
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/')
      window.location.reload();
    } catch {
      setError("Failed to create an account.");
    }
    setLoading(false);
  };

  const passError = (
    <div className={styles.error}>
      <p>Passwords do not match!</p>
    </div>
  );

  return (
    <div className={styles.signup}>
      <form onSubmit={submitHandler}>
        {error && passError}
        <label htmlFor="email">Enter your Email</label>
        <input id="email" ref={emailRef} type="email" />
        <label htmlFor="passwword">Password</label>
        <input id="Password" ref={passwordRef} type="password" />
        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          ref={confirmPasswordRef}
          className={error ? styles.errori : styles.none}
          autoComplete="off"
          id="confirm"
        ></input>
        <button disabled={loading} className={styles["sign-up"]} type="submit">
          Sign up
        </button>
        <Link to="/login">
          <button className={styles["log-in"]} type="button">
            Existing User?
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
