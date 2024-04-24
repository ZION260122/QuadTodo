import { createSlice, nanoid } from '@reduxjs/toolkit';

// Initial state with one example todo item
const initialState = {
  todos: [{ id: 1, text: "Hello world" }],
};

// Create a slice with name 'todo', the initial state, and the reducers
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // Reducer to add a new todo to the list
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(), // Generate a unique ID for the new todo
        text: action.payload, // Set the text to the payload from the dispatched action
      };
      state.todos.push(todo); // Add the new todo to the list
    },
    
    // Reducer to remove a todo by its ID
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload); // Keep only the todos that don't match the ID from the action payload
    },
    
    // Reducer to edit the text of a specific todo by its ID
    editTodo: (state, action) => {
      const { id, newText } = action.payload; // Extract the ID and new text from the action payload
      const todo = state.todos.find((todo) => todo.id === id); // Find the todo with the matching ID
      if (todo) {
        todo.text = newText; // Update the text of the found todo
      }
    },
  },
});

// Export the action creators for use in components
export const { addTodo, removeTodo, editTodo } = todoSlice.actions;

// Export the reducer to use in the Redux store
export default todoSlice.reducer;
