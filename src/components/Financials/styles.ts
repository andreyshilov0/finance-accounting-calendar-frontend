import styled from "@emotion/styled";
import { Container, TextField, Button, Autocomplete } from "@mui/material";
import { InputLabelProps } from "@mui/material/InputLabel";

export const FinancialsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const InputField = styled(TextField)<{
  inputLabelProps?: InputLabelProps;
}>`
  margin-bottom: 10px;
`;

export const ListContainer = styled(Container)`
  width: 100%;
  max-width: 400px;
`;

export const AddButton = styled(Button)`
  margin-top: 10px;
`;

export const NameAutocomplete = styled(Autocomplete)`
  width: 100%;
`;
