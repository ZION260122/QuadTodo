import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, editTodo } from '../features/todo/todoSlice'; // Importing `editTodo`

function Todos() {
  const todos = useSelector((state) => state.todos); // Getting todos from the Redux store
  const dispatch = useDispatch(); // Accessing the Redux dispatch function
  const [editingId, setEditingId] = useState(null); // State to track the ID of the todo being edited
  const [editText, setEditText] = useState(''); // State to store the text of the todo being edited

  // Function to initiate editing of a specific todo
  const startEditing = (todo) => {
    setEditingId(todo.id); // Set the ID of the todo to edit
    setEditText(todo.text); // Set the current text to the editText state
  };

  // Function to apply the changes to the todo being edited
  const saveEdit = (id) => {
    dispatch(editTodo({ id, newText: editText })); // Dispatch the edit action
    setEditingId(null); // Exit editing mode
    setEditText(''); // Clear the edit text state
  };

  return (
    <>
      <div className="text-2xl text-white mb-6">Todos</div> {/* Heading for the todos */}
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {/* Displaying the text of the todo */}
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)} // Update edit text on change
                className="bg-gray-700 text-white px-2 py-1 rounded focus:outline-none"
              />
            ) : (
              <div className="text-white">{todo.text}</div>
            )}

            <div className="space-x-2 flex justify-center"> {/* Wrapper for action buttons */}
              {/* Edit button to start editing a todo */}
              {editingId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)} // Save the edited text
                  className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(todo)} // Initiate editing
                  className="text-white bg-yellow-500 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded text-md"
                >
                  Edit
                </button>
              )}

              {/* Remove button to delete a todo */}
              <button
                onClick={() => dispatch(removeTodo(todo.id))} // Remove the todo
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107c
                    ancel mt-6 focus:outline-none rounded text-md"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
