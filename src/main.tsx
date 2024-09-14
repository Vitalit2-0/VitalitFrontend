import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ReactGA from "react-ga4";


ReactGA.initialize("G-1ZWWSB8THT");

ReactGA.send({ 
    hitType: "pageview", 
    page: window.location.pathname, 
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
