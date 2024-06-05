import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css';
import LayoutLanding from './components/shared/LayoutLanding';

const THEME = createTheme({
    typography: {
        "fontFamily": `"Poppins", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
});

function App() {
    return (
        <ThemeProvider theme={THEME}>
           <LayoutLanding/>
        </ThemeProvider>
        
    )
}

export default App
