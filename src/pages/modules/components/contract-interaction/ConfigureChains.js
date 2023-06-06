import { configureChains, mainnet, moonbaseAlpha } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'



const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, moonbaseAlpha],
  [publicProvider()],
)


const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  })

  function App() {
    return (
      <WagmiConfig config={config}>
        <YourRoutes />
      </WagmiConfig>
    )
  }



