import Card from '../Task/taskcard';

function Column(props){

    let counter = 2000;

    function increaseCounter(){
      return counter++;
    }


    const drop = e => {
      e.preventDefault();
      const card_id = e.dataTransfer.getData('card_id');
      const taskId = e.dataTransfer.getData('task_id');
      const sendingCatId = e.dataTransfer.getData('cat_id');
      const catId = props.catId;

      const reqBody = {
        catId : catId,
        sendingCatId : sendingCatId
      }

      //const card = document.getElementById(card_id);
      //card.style.display = 'block';

      //e.target.appendChild(card)

      fetch('http://localhost:8080/edit-task-category/'+`${taskId}`,{
        method: 'PUT',
        body: JSON.stringify(reqBody),
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then(res => {
        return res.json()
      }).then(data => {
        console.log(data)
      }).catch(err => console.log(err))
    }

    const dragOver = e => {
      //ovo kad se prebaci u drugi board
      e.preventDefault();
    }

    return <div id={increaseCounter()} onDrop={drop} onDragOver={dragOver}>
        {props.tasks.length==0 && <Card title="Empty" description="No tasks yet" />}
        {props.tasks.map((task) => (
        <Card
          key={task._id}
          taskId={task._id}
          title={task.title}
          description={task.description}
          onclickz={props.onclickz}
          catId={task.categoryId}
        />
      ))}
    </div>
}

export default Column;