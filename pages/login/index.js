import classes from '../../styles/register.module.css'
import { useRef } from 'react';

function Login() {

    const enteredEmail = useRef();
    const enteredPassword = useRef();


    function submitHandler(event){
        event.preventDefault();
        const email = enteredEmail.current.value;
        const password = enteredPassword.current.value;
    
        const reqBody = {
          email : email,
          password : password
        }
        fetch('http://localhost:8080/login',{
          method: 'post',
          body : JSON.stringify(reqBody),
          headers: { "Content-Type": "application/json" }
        }).then(response =>{
          return response.json()
        }).then(data => {
          console.log(data)
        })
    }


    return (
        <div>
          <form className={classes.formDiv} onSubmit={submitHandler}>
            <h1 className={classes.headline}>Log in</h1>
            <table>
              <tr>
                <td>
            <label htmlFor="email">Email</label>
            </td>
            <td>
            <input className={classes.inputField} type="text" name="email" id="email" ref={enteredEmail}/>
            </td>
            </tr>
            <tr>
              <td>
            <label htmlFor="password">Password</label></td>
            <td>
            <input className={classes.inputField}  type="password" name="password" id="password" ref={enteredPassword} />
            </td>
            </tr>
            </table>
            <input type="submit" value="Log in" className={classes.subtn} />
          </form>
        </div>
      );
}
export default Login;