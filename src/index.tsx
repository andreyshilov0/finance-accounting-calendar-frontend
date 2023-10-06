import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Suspense } from 'react';
import { CssBaseline } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import client from 'apollo/client';
import '@utilits/i18next'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <CssBaseline />
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode></Suspense>
);


