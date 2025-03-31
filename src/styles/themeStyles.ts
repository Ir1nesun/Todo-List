import { Switch } from "@mui/material";
import styled from "styled-components";

export const ThemeSwitchContainer = styled.div` 
 display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 60px;
  gap: 8px;
  position: absolute; 
  top: 20px; 
  left: 20px;
`;

export const ThemeSwitch = styled(Switch)`  
  && {
    width: 48px;
    height: 28px;
    padding: 7px;

    & .MuiSwitch-switchBase {
      padding: 4px;
      &.Mui-checked {
        transform: translateX(17px);
      }
    }

    & .MuiSwitch-thumb {
      width: 20px;
      height: 20px;
    }
  }
`;
