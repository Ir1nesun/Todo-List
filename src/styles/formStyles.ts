import { TextField } from "@mui/material";
import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 600px;
`;

export const StyledTextField = styled(TextField)`
  && {
    width: 600px;
    background-color: ${({ theme }) => (theme.background === "#333" ? "#444" : "#fff")};
    color: ${({ theme }) => theme.text};
    border-radius: 8px;

    & label {
      color: ${({ theme }) => (theme.background === "#333" ? "#bbb" : "#000")};
    }

    & input {
      color: ${({ theme }) => theme.text};
    }

    & fieldset {
      border-color: ${({ theme }) => (theme.background === "#333" ? "#bbb" : "rgba(0, 0, 0, 0.23)")};
    }
  }
`;

export const EditInput = styled.input`
  width: 100%;
  max-width: 100%;
  height: 36px;
  font-size: 16px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: ${({ theme }) => (theme.background === "#333" ? "#444" : "#fff")};
  color: ${({ theme }) => (theme.background === "#333" ? "#fff" : "#000")};
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => (theme.background === "#333" ? "#888" : "#1976d2")};
    outline: none;
    box-shadow: 0 0 5px rgba(25, 118, 210, 0.3);
  }
`;
