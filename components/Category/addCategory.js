import { useState, useRef } from "react";
import regclasses from "../../styles/register.module.css";
import classes from "../../styles/navbar.module.css";

function CategoryForm(props) {
  const [visible, setVisible] = useState(true);

  const enteredTitle = useRef();

  function cancelHandler() {
    props.onclick();
  }

  function submitHandler(event) {
    const title = enteredTitle.current.value;

    const reqBody = {
      title: title,
    };
    event.preventDefault();

    fetch("http://localhost:8080/create-category", {
      method: "post",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      }).catch(err =>
        console.log(err));

        cancelHandler();
  }

  if (visible === false) {
    return <div></div>;
  }

  return (
    <div>
      <form className={regclasses.formCatDiv} onSubmit={submitHandler}>
        <h2 className={regclasses.headline}>Add category</h2>
        <table>
          <tr>
        <td><label htmlFor="title"><p className={regclasses.p}>Title</p></label></td>
        <td>
        <input
          className={regclasses.inputField}
          type="text"
          name="title"
          id="title"
          ref={enteredTitle}
        ></input>
        </td>
        </tr>
        </table>
        <button onClick={cancelHandler} className={regclasses.subtncat}>Cancel</button>
        <input type="submit" value="Submit" className={regclasses.subtncat} />
      </form>

    </div>
  );
}
export default CategoryForm;
