import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider } from "./hooks/userContext";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserContextProvider>
);
