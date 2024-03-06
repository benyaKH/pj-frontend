import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'

import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="31940295351-2tloe7m2o1o51bmfpb0p0iqnr46ktfi7.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider >,
)
