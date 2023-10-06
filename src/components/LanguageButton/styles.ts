import { Button } from "@mui/material";
import styled from "@emotion/styled";

export const LanguageButtonStyle = styled(Button) <{ active: boolean }>`
  width: 20px;
  background-color: ${(props) => (props.active ? "black" : "transparent")};
  margin-right: 10px;
  color: ${(props) => (props.active ? "white" : "black")};

  &:hover {
    background-color: ${(props) => (props.active ? "black" : "lightgrey")};
    color: ${(props) => (props.active ? "white" : "black")};
  }

  &:active {
    background-color: ${(props) => (props.active ? "black" : "grey")};
    color: ${(props) => (props.active ? "white" : "black")};
  }
`;