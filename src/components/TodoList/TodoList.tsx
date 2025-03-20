import { useState, useEffect, useCallback, useMemo } from "react";
import AddTodo from "../AddTodo/AddTodo";
import { Todo } from "../../types";
import { saveTodos, getTodos } from "../../utils/localStorage";
import { TaskList, TaskItem, TaskRow, TaskText, TaskDate, FilterButton, FilterContainer } from "../../styles/todoStyles";
import { StyledButton, SortButton, SmallButton, ButtonContainer } from "../../styles/buttonStyles";
import { EditInput } from "../../styles/formStyles";


const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const savedTodos = getTodos();
    setTodos(savedTodos);
  }, []);

  const handleAddTodo = useCallback((newTodo: Todo) => {
      const updatedTodos = [
        { ...newTodo, createdAt: new Date().toISOString() },
        ...todos
      ];
  
      if (sortOrder === "desc") {
        updatedTodos.reverse();
      }
  
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
    },
    [todos, sortOrder]
  );

  const handleRemoveTodo = useCallback((id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  }, [todos]);

  const handleToggleComplete = useCallback((id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  }, [todos]);

  const handleEditTodo = useCallback(() => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingId ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setEditingId(null);
    setEditingText("");
  }, [todos, editingId, editingText]);

  const handleSortTodos = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [todos, sortOrder]);
  
  const filteredTodos = useMemo(() => {
    return sortedTodos
      .filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      })
      .sort((a, b) => (filter === "all" ? (a.completed === b.completed ? 0 : a.completed ? 1 : -1) : 0));
  }, [sortedTodos, filter]);


  return (
    <div>
      <AddTodo onAdd={handleAddTodo} />
      <SortButton variant="outlined" onClick={handleSortTodos}>
        {sortOrder === "asc" ? "↓ Старые сначала" : "↑ Новые сначала"}
      </SortButton>
      <FilterContainer>
        <FilterButton onClick={() => setFilter("all")} active={filter === "all"}>
          Все
        </FilterButton>
        <FilterButton onClick={() => setFilter("active")} active={filter === "active"}>
          Активные
        </FilterButton>
        <FilterButton onClick={() => setFilter("completed")} active={filter === "completed"}>
          Выполненные
        </FilterButton>
      </FilterContainer>
      <TaskList>
        {filteredTodos.map((todo) => (
          <TaskItem key={todo.id}>
            {editingId === todo.id ? (
              <>
                <EditInput
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ marginBottom: "10px", width: "100%" }}
                />
                <ButtonContainer>
                  <StyledButton variant="contained" color="success" onClick={handleEditTodo}>
                    ✅ Сохранить
                  </StyledButton>
                  <StyledButton variant="outlined" color="inherit" onClick={() => setEditingId(null)}>
                    ❌ Отмена
                  </StyledButton>
                </ButtonContainer>
              </>
            ) : (
              <>
                <TaskRow>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                  <TaskText style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                    {todo.text}
                  </TaskText>
                </TaskRow>
                <TaskDate>{new Date(todo.createdAt).toLocaleString()}</TaskDate>
                <ButtonContainer>
                  <SmallButton
                    variant="contained"
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditingText(todo.text);
                    }}
                  >
                    ✏️ Редактировать
                  </SmallButton>
                  <SmallButton variant="contained" color="secondary" onClick={() => handleRemoveTodo(todo.id)}>
                    🗑️ Удалить
                  </SmallButton>
                </ButtonContainer>
              </>
            )}
          </TaskItem>
        ))}
      </TaskList>
    </div>
  );  
};

export default TodoList;
