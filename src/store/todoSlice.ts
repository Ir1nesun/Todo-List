import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Todo } from "../types";

const API_URL = "http://localhost:5000/todos";

export const fetchTodos = createAsyncThunk<
  { todos: Todo[]; totalPages: number },
  { page: number; limit: number },
  { rejectValue: string }
>(
  "todos/fetchTodos",
  async ({ page, limit}, { rejectWithValue }) => {
    try {
      const response = await axios.get<Todo[]>(
        `${API_URL}?_page=${page}&_limit=${limit}`
      );
      const totalCount = Number(response.headers["x-total-count"]);
      const totalPages = Math.ceil(totalCount / limit);
      return {
        todos: response.data,
        totalPages,
      };
    } catch (error) {
      return rejectWithValue("Ошибка загрузки задач");
    }
  }
);

export const addTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
  "todos/addTodo",
  async (text, { rejectWithValue }) => {
    try {
      const newTodo = {
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      const response = await axios.post(API_URL, newTodo);
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка добавления задачи");
    }
  }
);

export const removeTodo = createAsyncThunk<
  number, 
  number, 
  { rejectValue: string }
>("todos/removeTodo", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue("Ошибка удаления задачи");
  }
});

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  sortOrder: "asc" | "desc";
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  sortOrder: "asc",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t: Todo) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find((t: Todo) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo: Todo) => todo.id !== action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload || "Ошибка добавления задачи";
      });
  },
});

export const {
  setPage,
  setSortOrder,
  toggleComplete,
  editTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
