import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const TodoItem = ({ task, onDelete, onEdit, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newDate, setNewDate] = useState(new Date(task.date));

  const saveEdit = () => {
    onEdit(newText, newDate);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-center justify-between mb-2 p-3 rounded ${task.isCompleted ? 'bg-gray-600' : 'bg-gray-700'}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            className="w-full p-1 bg-gray-600 rounded text-white"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <DatePicker
            selected={newDate}
            onChange={(date) => setNewDate(date)}
            className="ml-2 p-1 bg-gray-600 text-white"
          />
          <button
            onClick={saveEdit}
            className="ml-2 p-1 rounded bg-green-500 hover:bg-green-700"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={onToggle}
            className="mr-2"
          />
          <span className={task.isCompleted ? 'line-through' : ''}>{task.text}</span>
          <span className="ml-4 text-gray-400">{new Date(task.date).toLocaleDateString()}</span>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="ml-2 p-1 rounded bg-yellow-500 hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="ml-2 p-1 rounded bg-red-500 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

TodoItem.propTypes = {
  task: PropTypes.shape({
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoItem;