import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css';
import LayoutLanding from './components/shared/LayoutLanding';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

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
           <PayPalScriptProvider 
                options={{ 
                    clientId: "ASDTUNfoof-FPaQaKC8c9Ym-kXDOUsSW2w504NsJtE1fwEM5yguhF0nERJb5xrfUYfed8n0liw3nEPa8", 
                }}
            >
                <LayoutLanding/>
           </PayPalScriptProvider>
        </ThemeProvider>
        
    )
}

export default App
