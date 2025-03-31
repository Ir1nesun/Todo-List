import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser, fetchCurrentUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Alert, Button } from "@mui/material";
import { AuthFormContainer, AuthField } from "../../styles/authFormStyles";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
  
      if (loginUser.fulfilled.match(resultAction)) {
        await dispatch(fetchCurrentUser());
        navigate("/"); 
      }
    } catch (err) {
      console.error("Ошибка авторизации:", err);
    }
  };

  return (
    <AuthFormContainer onSubmit={handleSubmit}>
      <AuthField
        label="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthField
        label="Пароль"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Войти"}
      </Button>

      {error && <Alert severity="error">{error}</Alert>}
    </AuthFormContainer>
  );
};

export default LoginForm;
