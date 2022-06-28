import { styled, Paper, AppBar, Button, Card, TextField, } from "@mui/material"

export const BasePaper = styled(Paper, { name: 'BasePaper' })(({ theme }) => ({
    background: 'white',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '90%',
    maxWidth: '90%',
    borderRadius: '2em',
    '@media only screen and (min-width: 768px)': {
        height: '70%',
        aspectRatio: '1.618',
        borderRadius: '4em',
    },
}))

export const TextPaper = styled(Paper, { name: 'TextPaper' })(({ theme }) => ({
    background: theme.palette.general.dark,
    margin: '0.5em',
    padding: '0.25em 1em',
}))

export const NavBar = styled(AppBar, { name: 'NavBar' })(({ theme }) => ({
    margin: '1.5rem auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.general.dark,
    borderRadius: '0.5em',
    maxWidth: '90%',
    '@media only screen and (min-width: 768px)': {
        maxWidth: '50%',
    },
}))

export const NavBtn = styled(Button, { namae: 'NavBtn' })(({ theme }) => ({
    margin: '1.5rem auto',
    backgroundColor: theme.palette.general.dark,
    '&:hover': {
        backgroundColor: theme.palette.general.dark,
    },
}))

export const MetaBtn = styled(Button, { namae: 'MetaBtn' })(({ theme }) => ({
    margin: '0.5rem auto',
    backgroundColor: theme.palette.metamask.main,
    '&:hover': {
        backgroundColor: theme.palette.metamask.main
    },
}))

export const ProjectCard = styled(Card, { namae: 'ProjectCard' })(({ theme }) => ({
    margin: '0.5rem',
    backgroundColor: theme.palette.general.dark,
    borderRadius: '1em',
}))

export const FormField = styled(TextField, { namae: 'FormField' })(({ theme }) => ({
    margin: '0.75rem',
    maxWidth: '100%',
    input: {
        color: "#00929a",
    }
}))
