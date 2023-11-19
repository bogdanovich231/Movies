import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary/ErrorBoundery.tsx';
import ErrorMessage from './ErrorBoundary/ErrorMessage.tsx';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <ErrorBoundary fallback={<ErrorMessage />}>
      <App />
    </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
