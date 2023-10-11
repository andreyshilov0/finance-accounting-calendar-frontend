import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { TabList } from "react-tabs";

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const TabListWrapper = styled(TabList)`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: lightgray;
  border-bottom: 1px solid #ccc;

  li {
    list-style-type: none;
    padding: 5px;
  }
`;

export const TabButton = styled(Button)`
  flex: 1;
  margin: 0;
  padding: 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  text-align: center;
  &:hover {
    border-bottom-color: blue;
  }
`;
