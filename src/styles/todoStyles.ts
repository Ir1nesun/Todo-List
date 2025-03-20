import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 20px;
  font-family: "Inter", sans-serif;
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 600px; 
  margin-top: 20px;
`;

export const TaskItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  background: ${({ theme }) => (theme.background === "#333" ? "#444" : "#fff")};
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const TaskText = styled.span`
  width: 100%;
  word-wrap: break-word;
  margin-bottom: 10px; 
`;

export const TaskRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  line-height: 1.5;

  & input[type="checkbox"] {
    transform: scale(1.1);
    vertical-align: middle;
    margin-top: -8px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const TaskDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => (theme.background === "#333" ? "#bbb" : "#666")};
  margin-bottom: 6px;
  display: block;
  text-align: right;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  background-color: ${({ active, theme }) => (active ? theme.button : "transparent")};
  color: ${({ active, theme }) => (active ? "#fff" : theme.text)};
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.button};
    color: #fff;
  }
`;

