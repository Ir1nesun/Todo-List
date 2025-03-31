import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const AuthFormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: 400,
  width: "100%",
  margin: "0 auto",
  marginTop: "3rem",
});

export const AuthField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#f0f0f0",
  borderRadius: theme.shape.borderRadius,
}));
