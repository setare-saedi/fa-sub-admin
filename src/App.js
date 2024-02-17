import React from 'react';
import './App.css';
import routes from './routes.jsx';
import { useRoutes } from 'react-router-dom';
import AuthProvider from './hooks/AuthProvider.jsx';

function App() {
  let router = useRoutes(routes)

  return (
    <div>
      <AuthProvider>
        {
          router
        }
      </AuthProvider>
    </div>
  );
}

export default App;
