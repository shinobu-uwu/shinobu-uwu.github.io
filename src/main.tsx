import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import '@mantine/core/styles.css';

import { createTheme, MantineProvider, type MantineTheme } from '@mantine/core';

import * as TanStackQueryProvider from '@/integrations/tanstack-query/root-provider.tsx';

// Import the generated route tree
import { routeTree } from '@/routeTree.gen';

import './styles.css';
import reportWebVitals from '@/reportWebVitals.ts';

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  primaryColor: 'grape',
  primaryShade: 6,
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'Inter, sans-serif' },
});

// Render the app
const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <RouterProvider router={router} />
        </MantineProvider>
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
