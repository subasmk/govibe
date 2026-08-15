import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { DestinationProvider } from './context/DestinationContext';
import { SavedProvider } from './context/SavedContext';
import { NotificationProvider } from './context/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DestinationProvider>
          <SavedProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </SavedProvider>
        </DestinationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
