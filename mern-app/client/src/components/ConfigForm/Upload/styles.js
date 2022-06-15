import { grey } from "@mui/material/colors";

export const getStyles = (theme) => ({
  paper: {
    margin: '10px 0',
    padding: theme.spacing(2),
  },
  buttons: {
    boxShadow: 5,
    margin: theme.spacing(1),
  },
  previewGrid: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
  },
  card: {
    height: 60,
    width: 60,
    margin: theme.spacing(0.5),
    boxShadow: 3,
    borderRadius: '10%',
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});