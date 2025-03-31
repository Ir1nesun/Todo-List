import { useTheme } from "./theme/ThemeContext";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoList from "./components/TodoList/TodoList";
import { AppContainer } from "./styles/todoStyles";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppContainer>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
