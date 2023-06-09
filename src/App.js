// import logo from "./logo.svg";
import "./App.css";
import {createContext, useContext, useState } from "react";

const TasksContext = createContext();

function TaskForm() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useContext(TasksContext);

  function handleChange(e){
    setNewTask(e.target.value);
  }
  function handleSubmit() {
    setTasks(
      [
        ...tasks,
        {
          task : newTask,
          isDone : false,
        }
      ]
    )
    setNewTask('');
  }

  return (
    <>
      <input type="text" placeholder="Add New Task.." value={newTask} onChange={handleChange}></input>
      <button onClick={handleSubmit} > Add Task </button>
      </>
  );
}

function TaskListItem({task,status}) {
  // const name = !Task.isDone ? Task.task : <span style = {{backgroundColor : 'green', color : 'white'}}> {Task.task} </span>
  // const [isDone, setIsDone] = useState(task.isDone);
  const [tasks, setTasks] = useContext(TasksContext);

  function handleRemove(){
    // eslint-disable-next-line eqeqeq
    setTasks(tasks.filter(t => t.task != task.task));
  }

  function handleToggle(){
    const newTasks = tasks.map(t => {
      if(t.task == task.task){
        t.isDone = !task.isDone;
        return t;
      }
      else{
        return t
      }
    })
    setTasks(newTasks)
  }

  if(task.isDone === status){
    
    return (
      <li >
        <div>
          {task.task}
          {'\t'} 
          <button onClick={handleRemove}> Remove Task </button>
          <input type="checkbox" checked = {status} onClick={handleToggle}/> {' '} Task Done
        </div>
      </li>
    )
}
}

function TaskList({status}) {
  const [tasks] = useContext(TasksContext);
  const listItems = tasks.map(task => <TaskListItem key = {task.task} task = {task}  status={status} />)
  return <ul>{listItems}</ul>;
}

function App() {

  // const [likes, setLikes] = useState(0);

    const [tasks, setTasks] = useState([
      {task : "Clean room", isDone : false, details : "call the cleaner"},
      {task : "Join Meeting", isDone : false, details : "https://meet.google.com/jfn-iyhj-yzz"},
      {task : "Learn React", isDone : true, details : "react docs"}
    ])
    // function handleRemove(task) {
    //   const newTasks =  tasks.filter(t => t.task !== task.task);
    //   setTasks(
    //     newTasks
    //   )
    //   // alert('removing')
    // }

  return (
    <div className="App">
      <TasksContext.Provider value={[tasks , setTasks]}>
      {/* <TaskForm tasks = {tasks} setTasks = {setTasks}/> */}
      <TaskForm />
      
      <h3>Remaining Tasks </h3>
      <TaskList status={false}/>
      <h3>Completed Tasks </h3>
      <TaskList status={true}/>
      </TasksContext.Provider>
    </div>
  );
}

export default App;
