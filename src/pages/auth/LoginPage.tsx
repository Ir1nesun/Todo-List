import React from "react";
import LoginForm from "../auth/LoginForm";
import { Box } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "3rem", 
        padding: 2,
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
