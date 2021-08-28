import { useRef } from "react";
import regclasses from "../../styles/register.module.css";

function Signup() {
  const enteredFirstName = useRef();
  const enteredLastName = useRef();
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  function submitHandler(event) {

    const firstName = enteredFirstName.current.value;
    const lastName = enteredLastName.current.value;
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;

    const reqBody = {
      firstName : firstName,
      lastName : lastName,
      email : email,
      password : password
    }

    event.preventDefault();
    fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data)
    }).catch(err => console.log(err));

    alert('You have successfully registered to Tasks!\n Please log in');
    window.location ='http://localhost:3000/login'
  }

  return (
    <div>
      <form className={regclasses.formDiv} onSubmit={submitHandler}>
        <h2 className={regclasses.headline}>Sign up</h2>
        <table>
          <tr>
        <td><label htmlFor="firstName">First name</label></td>
        <td><input
          className={regclasses.inputField}
          type="text"
          name="firstName"
          id="firstName"
          ref={enteredFirstName}
        ></input>
        </td>
        </tr>
        <tr>
          <td>
        <label htmlFor="lastName">Last name</label>
        </td>
        <td>
        <input
          className={regclasses.inputField}
          type="text"
          name="lastName"
          id="lastName"
          ref={enteredLastName}
        ></input>
        </td>
        </tr>
        <tr>
          <td>
        <label htmlFor="email">Email</label>
        </td>
        <td>
        <input
          className={regclasses.inputField}
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
          className={regclasses.inputField}
          type="password"
          name="password"
          id="password"
          ref={enteredPassword}
        />
        </td>
        </tr>
        </table>
        <input type="submit" value="Sign Up" className={regclasses.subtn} />

      </form>
    </div>
  );
}

export default Signup;
