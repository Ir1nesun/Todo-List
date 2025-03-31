import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchTodos, removeTodo, toggleComplete, editTodo, setPage,} from "../../store/todoSlice";
import AddTodo from "../AddTodo/AddTodo";
import { TaskList, TaskItem, TaskRow, TaskText, TaskDate, FilterButton, FilterContainer } from "../../styles/todoStyles";
import { StyledButton, SortButton, SmallButton, ButtonContainer} from "../../styles/buttonStyles";
import { EditInput } from "../../styles/formStyles";
import { Pagination } from "@mui/material";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);
  const page = useSelector((state: RootState) => state.todos.page);
  const totalPages = useSelector((state: RootState) => state.todos.totalPages);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const limit = 5;

  useEffect(() => {
    dispatch(fetchTodos({ page, limit }));
  }, [dispatch, page]);

  const handleRemoveTodo = useCallback((id: number) => {
    dispatch(removeTodo(id))
      .unwrap()
      .then(() => {
        dispatch(fetchTodos({ page, limit }));
      })
      .catch((error) => {
        console.error("Ошибка удаления:", error);
      });
  }, [dispatch, page]);

  const handleToggleComplete = useCallback((id: number) => {
    dispatch(toggleComplete(id));
  }, [dispatch]);

  const handleEditTodo = useCallback(() => {
    if (editingId && editingText.trim()) {
      dispatch(editTodo({ id: editingId, text: editingText }));
      setEditingId(null);
      setEditingText("");
    }
  }, [dispatch, editingId, editingText]);

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
      .sort((a, b) => (filter === "all"
        ? a.completed === b.completed ? 0 : a.completed ? 1 : -1
        : 0));
  }, [sortedTodos, filter]);

  return (
    <div>
      <AddTodo />
      {loading && <p>Загрузка задач...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <SortButton variant="outlined" onClick={handleSortTodos}>
        {sortOrder === "asc" ? "↓ Старые сначала" : "↑ Новые сначала"}
      </SortButton>

      <FilterContainer>
        <FilterButton onClick={() => setFilter("all")} $active={filter === "all"}>Все</FilterButton>
        <FilterButton onClick={() => setFilter("active")} $active={filter === "active"}>Активные</FilterButton>
        <FilterButton onClick={() => setFilter("completed")} $active={filter === "completed"}>Выполненные</FilterButton>
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
                />
                <ButtonContainer>
                  <StyledButton variant="contained" color="success" onClick={handleEditTodo}>
                    ✅ Сохранить
                  </StyledButton>
                  <StyledButton variant="outlined" onClick={() => setEditingId(null)}>
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
                  <SmallButton variant="contained" onClick={() => {
                    setEditingId(todo.id);
                    setEditingText(todo.text);
                  }}>
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

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => dispatch(setPage(value))}
        color="primary"
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default TodoList;
