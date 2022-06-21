import React from "react";
import { Container, AppBar, Typography, Grow, Grid, Toolbar, createTheme, ThemeProvider } from "@mui/material";

import NFTs from './components/ArtGrid/ArtGrid'
import ConfigForm from './components/ConfigForm/ConfigForm'


function App() {
    const theme = createTheme();

    const styles = {
        appBar: { borderRadius: '0.25em', margin: '30px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
        image: { marginLeft: '15px', height: 60, width: 60, }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <AppBar sx={styles.appBar} position="static" color="inherit">
                    <Toolbar>
                        <Typography sx={styles.toolbar} variant="h2">
                            NFT Generator
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container direction="column" justify="space-between" alignItems="center" spacing={3}>
                            <Grid item>
                                <ConfigForm theme={theme} />
                            </Grid>
                            <Grid item>
                                <NFTs theme={theme}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </ThemeProvider>
    );
}

export default App;
