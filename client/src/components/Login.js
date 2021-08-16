import React, {useContext, useRef,useState} from "react";
import styles from "./Login.module.css";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../contexts/auth-context";

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useContext(AuthContext)
    const [error,setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true); // done so that use doesn't login to multiple accounts while current
            //account is being created.
            await login(emailRef.current.value, passwordRef.current.value);
           
            history.push("/")
            window.location.reload();
          } catch {
            setError("Failed to log in. Invalid Email address or password.");
          }
          setLoading(false);
          
         
    }

    const passError = (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      );



  return (
    <div className={styles.login}>
      <form onSubmit={submitHandler}>
        {error && passError}
        <label htmlFor="Email">Enter your Email</label>
        <input id="Email" type="email" ref={emailRef} />
        <label htmlFor="passwword">Password</label>
        <input id="Password" type="password" ref={passwordRef} />
        <button disabled={loading} className={styles["log-in"]} type="submit">
          Log in
        </button>
        <Link to="/signup"><button
          type="button"
          className={styles["sign-in"]}
        >
          New User?
        </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
