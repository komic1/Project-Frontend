import classes from "../../styles/card.module.css";
import headclasses from '../../styles/container.module.css';
import regclasses from '../../styles/register.module.css';
import { useState } from 'react';
import EditForm from "./edit";
import Backdrop from "../Layout/backdrop";

function Card(props) {

  const taskId = props.taskId;

  let counter = 0;

  function increaseCounter(){
    return counter++;
  }

  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.setData('card_id',target.id);
    e.dataTransfer.setData('task_id',taskId);
    e.dataTransfer.setData('cat_id',props.catId);


    setTimeout(()=>{
      target.style.display="none";
    },0)
  }

  const dragOver = e => {
    e.stopPropagation();
  }


 

  const [showEdit, setEdit] = useState(false);
  const [showBackdrop, setBackdrop] = useState(false);

  function editHandler(){
    //console.log(props.taskId)
    setEdit(true);
    setBackdrop(true);
  }

  function removeHandler(){
    setEdit(false);
    setBackdrop(false);
  }

  

  function deleteTask() {
    fetch("http://localhost:8080/delete-task/" + taskId, {
      method: "delete",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id={increaseCounter()} draggable="true" onDragStart={dragStart} onDragOver={dragOver} className={classes.card}>
      <div className={classes.container}>
        <div className={headclasses.miniDiv}>
          <header className={headclasses.header}>{props.title}</header>
          <button onClick={deleteTask} className={headclasses.buta}>
            X
          </button>
        </div>
        <p>{props.description}</p>
        <div className={regclasses.btnHolder}><button onClick={editHandler} className={regclasses.btn}>Edit</button></div>
      </div>
      {showEdit && <EditForm onclick={removeHandler} tid={taskId} title={props.title} description={props.description} />}
      {showBackdrop && <Backdrop />}
    </div>
  );
}

export default Card;
