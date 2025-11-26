import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodosState } from "../../types/todos.types";

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchTodosByStatusRequest: (state, action: PayloadAction<boolean>) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosByStatusSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosByStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addTodoRequest: (
      state,
      action: PayloadAction<{
        id: number;
        userId: number;
        title: string;
        completed: boolean;
        category: "Produtive" | "Personal" | "Others";
      }>
    ) => {
      state.loading = true;
    },
    addTodoSuccess: (state, action: PayloadAction<Todo>) => {
      state.loading = false;
      state.todos.push(action.payload);
    },
    addTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateTodoRequest: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        completed: boolean;
        category: "Produtive" | "Personal" | "Others";
      }>
    ) => {
      state.loading = true;
    },
    updateTodoSuccess: (state, action: PayloadAction<Todo>) => {
      state.loading = false;
      state.todos = state.todos.map((td) =>
        td.id === action.payload.id ? action.payload : td
      );
    },
    updateTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTodoRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteTodoSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    deleteTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  fetchTodosByStatusRequest,
  fetchTodosByStatusSuccess,
  fetchTodosByStatusFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
} = todoSlice.actions;

export default todoSlice.reducer;
