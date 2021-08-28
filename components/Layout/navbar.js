import  Link from "next/link";
import classes from '../../styles/navbar.module.css'

function Navbar(props) {
  return (
    <div className={classes.div}>
        <nav className={classes.nav}>
      <ul>
        <li className={classes.li}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className={classes.li} >
          <Link href="/signup">Sign Up</Link>
        </li>
        <li className={classes.li}>
          <Link href="/login">Login</Link>
        </li>
      </ul>
      </nav>
      {props.children}
    </div>
  );
}

export default Navbar;
