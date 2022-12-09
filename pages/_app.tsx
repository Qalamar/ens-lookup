import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import GlobalStyles from '../styles/GlobalStyles'

const { provider, webSocketProvider } = configureChains([mainnet], [publicProvider()])

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        registrations: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          },
        },
      },
    },
  },
})

const apolloClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  cache: apolloCache,
})

const App = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={cache}>
    <GlobalStyles />
    <WagmiConfig client={client}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WagmiConfig>
  </CacheProvider>
)

export default App
