import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  Typography,
  Snackbar,
  Grid,
  Container,
} from "@mui/material";

export const SettingsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const CategoryList = styled(Grid)`
  width: 100%;
`;

export const CategoryItem = styled(Grid)`
  display: flex;
  align-items: center;
  padding: 8px 0;
  justify-content: space-between;
`;

export const CategoryActions = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    cursor: pointer;
  }
`;

export const CategoryName = styled(Typography)`
  font-weight: 500;
`;

export const ModalDialog = styled(Dialog)`
  .MuiPaper-root {
    max-width: 400px;
  }
`;

export const SnackbarMessage = styled(Snackbar)`
  .MuiSnackbarContent-root {
    background-color: #f44336;
  }
`;

export const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  background-color: #2196f3;
  color: white;

  svg {
    margin-right: 8px;
  }
`;
