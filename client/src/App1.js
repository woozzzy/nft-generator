import React from "react";
import { styled, Container, Grow, createTheme, ThemeProvider, Paper } from "@mui/material";

function App() {
    const theme = createTheme();

    const StyledPaper = styled(Paper, {
        name: 'StyledPaper',
    })(() => ({
        height: '60%',
        width: '80%',
        borderRadius: '8em',
        margin: 'auto',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }))

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Grow in>
                    <Container>
                        <StyledPaper elevation={10}>

                        </StyledPaper>
                    </Container>
                </Grow>
            </Container>
        </ThemeProvider>
    );
}

export default App;
