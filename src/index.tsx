import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider, ReactQueryDevtools } from './libs/react-query';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            cursorType: 'pointer',
            components: {
              Modal: {
                styles: () => ({
                  title: { fontSize: '20px', fontWeight: 'bold' },
                }),
              },
              Tabs: {
                styles: () => ({
                  tabLabel: {
                    fontWeight: 600,
                    fontSize: '15px',
                  },
                }),
              },
            },
          }}
        >
          <App />
        </MantineProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
