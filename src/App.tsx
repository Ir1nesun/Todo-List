import { useTheme } from "./theme/ThemeContext";
import TodoList from "./components/TodoList/TodoList";
import { AppContainer } from "./styles/todoStyles";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppContainer>
      <h1>Todo List</h1>
      <TodoList />
    </AppContainer>
  );
};

export default App;
