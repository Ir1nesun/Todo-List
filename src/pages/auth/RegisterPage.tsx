import React from "react";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
      <div>
        <h2>Регистрация</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
