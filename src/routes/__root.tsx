import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.layer.css'

import Header from '@/components/header'

import TanStackQueryProvider from '@/integrations/tanstack-query/root-provider'

import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'

import appCss from '@/styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const theme = createTheme({
  colors: {
    dracula: [
      '#282a36',
      '#343746',
      '#44475a',
      '#6272a4',
      '#8be9fd',
      '#50fa7b',
      '#f1fa8c',
      '#ffb86c',
      '#ff79c6',
      '#bd93f9',
    ],
  },
  primaryColor: 'dracula',
  primaryShade: 9,
  fontFamily: '"Space Grotesk", "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily: '"Space Grotesk", "Helvetica Neue", Arial, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
})

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Shinobu',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png',
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center gap-4 px-6 text-center text-[color:var(--dracula-foreground)]">
      <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--dracula-comment)]">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="text-base text-[color:var(--dracula-comment)]">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-current-line)]/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--dracula-foreground)] transition hover:-translate-y-0.5 hover:border-[color:var(--dracula-purple)] hover:text-[color:var(--dracula-purple)]"
      >
        Go home
      </a>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <MantineProvider
          theme={theme}
          defaultColorScheme="dark"
          forceColorScheme="dark"
        >
          <TanStackQueryProvider>
            <Header />
            {children}
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
          </TanStackQueryProvider>
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  )
}
