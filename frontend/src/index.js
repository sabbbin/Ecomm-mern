import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import { CookiesProvider } from "react-cookie";
import 'react-toastify/dist/ReactToastify.css'
import 'rc-slider/assets/index.css'


const container= document.getElementById('root')
const root= ReactDOM.createRoot(container)
root.render(
<CookiesProvider>

<App />
</CookiesProvider>

)
