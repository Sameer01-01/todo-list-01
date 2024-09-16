import { useState } from 'react';
import TodoItem from './components/TodoItem';
import 'react-datepicker/dist/react-datepicker.css';
import backgroundImage from './assets/mybg.jpg'; // replace with your image path

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  // Function to generate unique IDs for tasks
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = {
        id: generateId(),  // Generate a unique ID for each task
        text: newTask,
        date: startDate,
        isCompleted: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
      setStartDate(new Date());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText, newDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, date: newDate } : task
      )
    );
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md p-4 bg-black bg-opacity-20 rounded-lg">
        <h1 className="text-4xl font-bold mb-6 rounded-md text-center bg-gradient-to-r from-blue-600 to-purple-400 hover:from-purple-400 hover:to-blue-600">
          My To-Do List
        </h1>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <input
              type="text"
              className="w-full p-2 rounded-full bg-gray-700 text-white focus:outline-none"
              placeholder="Add a task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={addTask}
              className="ml-2 p-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl text-center text-white font-bold mb-4">Incomplete Tasks</h2>
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onDelete={() => deleteTask(task.id)}
                onEdit={(newText, newDate) => editTask(task.id, newText, newDate)}
                onToggle={() => toggleCompletion(task.id)}
              />
            ))
          ) : (
            <p className="text-white">No incomplete tasks!</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl text-center text-white font-bold mb-4">Completed Tasks</h2>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onDelete={() => deleteTask(task.id)}
                onEdit={(newText, newDate) => editTask(task.id, newText, newDate)}
                onToggle={() => toggleCompletion(task.id)}
              />
            ))
          ) : (
            <p className="text-white">No completed tasks!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
