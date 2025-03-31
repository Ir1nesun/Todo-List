import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addTodo, fetchTodos, setPage } from "../../store/todoSlice";
import { AddButton } from "../../styles/buttonStyles";
import { InputContainer, StyledTextField } from "../../styles/formStyles";

const AddTodo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");
  const page = useSelector((state: RootState) => state.todos.page);
  const limit = 5;

  const handleAdd = () => {
    if (!text.trim()) return;

    dispatch(addTodo(text))
      .unwrap()
      .then(() => {
        setText("");
        dispatch(setPage(1));
        dispatch(fetchTodos({ page: 1, limit }));
      })
      .catch((error) => {
        console.error("Ошибка при добавлении:", error);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <InputContainer>
      <StyledTextField
        label="Новая задача"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        fullWidth
      />
      <AddButton variant="contained" onClick={handleAdd}>
        Добавить
      </AddButton>
    </InputContainer>
  );
};

export default AddTodo;
