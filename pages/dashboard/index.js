import Container from '../../components/Category/catContainer';
import { useEffect, useState } from "react";
import AddForm from "../../components/Task/addForm";
import CategoryForm from "../../components/Category/addCategory";
import Backdrop from "../../components/Layout/backdrop";
import classes from '../../styles/register.module.css';
import Home from '../index';
import Navbar from '../../components/Layout/navbar';

function Dashboard() {

  const [state, setState ] = useState({
    token : null,
    userId : null,
  })


  function userHandler(user,token){
    setState({
      token : token,
      userId: user
    })
  }
  



  const [categories, setCategories] = useState([]);

  const [showAddForm, setForm] = useState(false);
  const [showCatForm, setCatForm] = useState(false);
  const [showBackdrop, setBackdrop] =useState (false);
  const [showEditForm, setEditForm] = useState(false);


  let tId,ttitle,ddescription;

  function logoutHandler(){
    fetch('http://localhost:8080/logout')
    .then(res => {
      return res.json()
    }).then( data => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setState({token : null, userId : null});
    })

  }

  useEffect(async () => {
    fetch("http://localhost:8080/all-categories",{
      headers : {
        Authorization : 'Bearer ' + state.token
      }
    })
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



  function hideForm() {
    setForm(false);
    setBackdrop(false);
  }

  function showForm() {
    setForm(true);
    setBackdrop(true);
  }
  function hideEdForm() {
    setEditForm(false);
    setBackdrop(false);
  }

  function showEdForm(id,title,description) {
    tId = id;
    ttitle = title;
    ddescription = description;
    setEditForm(true);
    setBackdrop(true);
  }

  function showCategoryForm() {
    setCatForm(true);
    setBackdrop(true);
  }

  function hideCategoryForm() {
    setCatForm(false);
    setBackdrop(false);
  }

  if(state.token==null){
    return <Home handler={userHandler} />
  }

  return (
    <div>
      <Navbar handler={logoutHandler} />
      <div>
        <button className={classes.btn} onClick={showForm}>Add Task</button>
        <button onClick={showCategoryForm} className={classes.btn}>Add category</button>
      </div>
      {showCatForm && <CategoryForm onclick={hideCategoryForm} userId={state.userId} />}
      {showAddForm && <AddForm onclick={hideForm} userId={state.userId} />}
      {showBackdrop && <Backdrop />}
      {categories.map((category)=>(
        <Container onclickz={showEdForm} key={category._id} title={category.title} tasks={category.tasks} catId={category._id} />
      ))}

    </div>
  );
}

export default Dashboard;
