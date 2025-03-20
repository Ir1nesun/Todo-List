import { Button } from "@mui/material";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  && {
    min-width: auto;
    height: 32px;
    font-size: 14px;
    padding: 4px 12px;
    border-radius: 6px;
    text-transform: none;

    &:hover {
      background-color: ${({ theme }) => (theme.button === "#1976d2" ? "#1255a2" : "#8a52ff")};
      transform: scale(1.05);
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SortButton = styled(StyledButton)`
  && {
    width: 100%;
    height: 36px;
    margin-top: 10px;
    background-color: transparent;
    color: ${({ theme }) => (theme.background === "#333" ? "#fff" : "#555")};
    border: 1px solid #ccc;
    font-size: 14px;
    font-weight: normal;
    border-radius: 6px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      border-color: #aaa;
      color: ${({ theme }) => (theme.background === "#333" ? "#fff" : "#333")} !important;
    }
  }
`;

export const AddButton = styled(Button)`
  && {
    height: 56px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    text-transform: none;
    padding: 10px 20px;
    margin-left: 10px;
    transition: all 0.3s ease-in-out;
    background-color: ${({ theme }) => theme.button};
    color: white;
    min-width: 140px;

    &:hover {
      background-color: ${({ theme }) => (theme.button === "#1976d2" ? "#1255a2" : "#8a52ff")};
      transform: scale(1.05);
    }
  }
`;

export const SmallButton = styled(StyledButton)`
  && {
    min-width: auto;
    height: 32px;
    font-size: 14px;
    padding: 4px 10px;
    border-radius: 6px;
  }
`;
