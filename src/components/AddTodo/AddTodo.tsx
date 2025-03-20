import { useState } from "react";
import { Todo } from "../../types";
import { AddButton } from "../../styles/buttonStyles";
import { InputContainer, StyledTextField } from "../../styles/formStyles";

interface AddTodoProps { 
  onAdd:(todo: Todo) => void; 
}

const AddTodo: React.FC<AddTodoProps> = ({onAdd}) => { 
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return; 

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAdd(newTodo);
    setText("");
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return(
    <>
    <InputContainer> 
        <StyledTextField
          label= "Новая задача"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
        />
        <AddButton
          variant="contained"
          onClick={handleAdd}>
            Добавить
        </AddButton>
      </InputContainer> 
    </>
  );
};

export default AddTodo;