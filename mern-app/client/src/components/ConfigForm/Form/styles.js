export const getStyles = (theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paper: {
    margin: '10px 0',
    padding: theme.spacing(2),
  },
  buttons: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    margin: '10px 0',
  },
});