import classes from '../../styles/container.module.css'
import Column from '../Layout/column';
import { useState } from 'react';

function Container(props){


    function deleteCategory(){
        fetch("http://localhost:8080/delete-category/"+ `${props.catId}`,{
            method: 'DELETE'
        })
        .then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
        })
    }

    return <div className={classes.div}>
        <div className={classes.miniDiv}>
        <header className={classes.header}> {props.title} </header>
        <button className={classes.buta} onClick={deleteCategory}>X</button>
        </div>
        <Column catId={props.catId} tasks={props.tasks} onclickz={props.onclickz} />
    </div>
}

export default Container;