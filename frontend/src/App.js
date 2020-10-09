import React from 'react';
import './App.css';
import PublicRoutes from './Routes/PublicRoutes';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Navbar from './Components/Navbar/Navbar';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.status.danger
    },
    checked: {}
}));

const theme = createMuiTheme({
    palette: {
        primary: { main: '#ff3f6c' },
        secondary: { main: '#282c3f' }
    }
});

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Navbar />
                <PublicRoutes {...props} />
            </div>
        </ThemeProvider>
    );
}

export default App;
