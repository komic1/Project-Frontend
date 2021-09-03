import classes from '../styles/homepage.module.css';
import Login from "./login";

export default function Home(props) {


  return (
    <div className={classes.div}>
      <h1>Welcome to Tasks</h1>
      <Login handler={props.handler} />
  </div>
  );
}
