import React from 'react';
import './App.css';
import PublicRoutes from './Routes/PublicRoutes';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Navbar from './Components/Navbar/Navbar';
import Snackbar from './Snackbar';
import Spinner from './Spinner';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#ff3f6c' },
        secondary: { main: '#282c3f' },
        green: { main: '#0bc6a0' }
    }
});

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Navbar />
                <PublicRoutes {...props} />
                <Snackbar />
                <Spinner />
            </div>
        </ThemeProvider>
    );
}

export default App;
