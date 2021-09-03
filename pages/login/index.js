import classes from "../../styles/register.module.css";
import { useRef } from "react";
import { useRouter } from 'next/router'

function Login(props) {
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  const router = useRouter();

  function signupHandler(){
    router.push('/signup');
  }

  function submitHandler(event) {
    event.preventDefault();
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;

    const reqBody = {
      email: email,
      password: password,
    };
    
    fetch("http://localhost:8080/login", {
      method: "post",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        props.handler(data.userId,data.token);
        localStorage.setItem('userId',data.userId);
        localStorage.setItem('token',data.token);
      });
  }

  return (
    <div>
      <form className={classes.formDiv} onSubmit={submitHandler}>
        <h1 className={classes.headline}>Log in</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">Email</label>
              </td>
              <td>
                <input
                  className={classes.inputField}
                  type="text"
                  name="email"
                  id="email"
                  ref={enteredEmail}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password</label>
              </td>
              <td>
                <input
                  className={classes.inputField}
                  type="password"
                  name="password"
                  id="password"
                  ref={enteredPassword}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Log in" className={classes.subtn} />
        <button className={classes.subtn} onClick={signupHandler}>Sign up</button>
      </form>

    </div>
  );
}
export default Login;
