import { useState } from 'react';
import Header from "./components/Header";
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  // Task Data rendering on the page 
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30 pm',
      reminder: true
    },
    {
      id: 2,
      text: 'Brunch',
      day: 'Feb 6th at 2:30 pm',
      reminder: true
    },
    {
      id: 3,
      text: 'Play Football',
      day: 'Feb 7th at 2:30 pm',
      reminder: false
    },
  ])

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000)+1
    console.log(id)
    const  newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  // For Delete
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // For Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  return (
    <div className="container">
      <Header /> 
      <AddTask onAdd={addTask}/>
      {tasks.length > 0 ?
        (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>)
        : (
          "Nothing To Show"
        )
      }
    </div>
  );
}

export default App;