import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  // Toggle button to show the add task form
  const [showAddTask, setshowAddTask] = useState(false)

  // Task Data rendering on the page 
  const [tasks, setTasks] = useState([])

  // Updating fetch data into state
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer);
    }
    getTasks()
  }, [])
  
  // Fetch Tasks from Json server
  const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data;
  }

  // Fetch Task from Json server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data;
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body:  JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // For Delete
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
      {method: 'DELETE'} 
    )

    // to delete the data from UI
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // For Reminder toggling to true or false
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(updateTask),
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task))
  }

  return (
    <div className="container">
      <Header onAdd={() => setshowAddTask(!showAddTask)} showAdd={showAddTask}/> 
      {showAddTask && <AddTask onAdd={addTask}/>}
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