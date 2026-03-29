import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './index.css'
import { AppContextProvider } from './context/AppContext.jsx';
import { ClerkProvider } from '@clerk/clerk-react';


const PUBLIC_KEY=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!PUBLIC_KEY)
{
    throw new Error("Public Key of clerk is not present");
}

createRoot(document.getElementById('root')).render(
    <AppContextProvider>
        <ClerkProvider publishableKey={PUBLIC_KEY}>
             <App />
        </ClerkProvider>
    </AppContextProvider>,
)
