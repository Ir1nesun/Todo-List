import { Todo } from "../types";

const TODOS_KEY = "todos";

export const getTodos = (): Todo[] => {
    const todos = localStorage.getItem(TODOS_KEY);
    return todos ? JSON.parse(todos) : [];
};

export const saveTodos = (todos: Todo[]) =>{
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};