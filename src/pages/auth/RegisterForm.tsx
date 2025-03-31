import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import {Button, CircularProgress, Alert } from "@mui/material";
import { AuthFormContainer, AuthField } from "../../styles/authFormStyles";

const RegisterForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const { loading, error } = useSelector((state: RootState) => state.auth);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const resultAction = await dispatch(registerUser({ email, password }));
  
        if (registerUser.fulfilled.match(resultAction)) {
          navigate("/login");
        }
      } catch (err) {
        console.error("Ошибка регистрации:", err);
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Зарегистрироваться"}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </AuthFormContainer>
    );
  };
  
  export default RegisterForm;
