import { useState, useRef, useEffect } from "react";
import regclasses from "../../styles/register.module.css";

function AddForm(props) {
  const [visible, setVisible] = useState(true);

  const [categories, setCategories] = useState([]);

  const enteredTitle = useRef();
  const enteredDescription = useRef();
  const selectedItem = useRef();


  function cancelHandler() {
    props.onclick();
  }

  function submitHandler(event) {
    const title = enteredTitle.current.value;
    const description = enteredDescription.current.value;
    const selected = selectedItem.current.value;

    console.log(selected)
    

    const reqBody = {
      title: title,
      description: description,
      categoryId : selected
    };
    event.preventDefault();

    fetch("http://localhost:8080/create-task", {
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

  useEffect(async () => {
    fetch("http://localhost:8080/all-categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const categories = data.categories;
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categories]);

  if (visible === false) {
    return <div></div>;
  }

  return (
    <div >

      <form className={regclasses.formDiv} onSubmit={submitHandler}>
        <h2 className={regclasses.headline}> Add new task</h2>
        <table>
          <tr>
        <td><label htmlFor="title"> <p className={regclasses.p}><b>Title</b> </p></label></td>
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
        <tr>
          <td>
        <label htmlFor="description"> <p className={regclasses.p}><b>Description</b></p></label>
        </td>
        <td>
        <input
          className={regclasses.inputField}
          type="text"
          name="description"
          id="description"
          ref={enteredDescription}
        ></input>
        </td>
        </tr>
        <tr>
          <td>
        <label htmlFor="category"><p className={regclasses.p}><b>Category</b></p></label></td>
        <td>
        <select className={regclasses.inputField} id="categories" name="categories" ref={selectedItem}>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.title}</option>
            ))}
        </select>
        </td>
        </tr>
        </table>
        <div className={regclasses.headline}>
        <button onClick={cancelHandler} className={regclasses.btn}>Cancel</button>
        <input type='submit' value='Submit' className={regclasses.btn} />
        </div>
      </form>
    </div>
  );
}
export default AddForm;
