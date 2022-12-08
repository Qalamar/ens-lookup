import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import GlobalStyles from 'styles/GlobalStyles'
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        read(existing, { args: { skip = 0, first = existing?.length } = {} }) {
          return existing && existing.slice(skip, skip + first)
        },
        registrations: {
          keyArgs: false,
          merge(existing, incoming, { args: { skip = 0 } }) {
            const merged = existing ? existing.slice(0) : []
            for (let i = 0; i < incoming.length; ++i) {
              merged[skip + i] = incoming[i]
            }
            return merged
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
