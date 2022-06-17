import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid, Toolbar, createTheme, ThemeProvider } from "@mui/material";

// import NFTs from './components/NFTs/NFTs'
import ConfigForm from './components/ConfigForm/ConfigForm'


function App() {
    const [currentId, setCurrentId] = useState(0);
    const theme = createTheme();

    const styles = {
        appBar: { borderRadius: 15, margin: '30px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
        toolbar: { color: 'rgba(0,183,255, 1)', },
        image: { marginLeft: '15px', height: 60, width: 60, }
    }

    const props = {
        currentId,
        setCurrentId,
        theme,
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <AppBar sx={styles.appBar} position="static" color="inherit">
                    <Toolbar>
                        <Typography sx={styles.toolbar} variant="h2">
                            NFT-App
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container direction="column" justify="space-between" alignItems="center" spacing={3}>
                            {/* <Grid item xs={12} sm={8}> */}
                                {/* <NFTs theme={theme} setCurrentId={setCurrentId} /> */}
                            {/* </Grid> */}
                            <Grid item xs={12} sm={12}>
                                <ConfigForm props={props} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </ThemeProvider>
    );
}

export default App;
