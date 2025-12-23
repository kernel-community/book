'use client'

import { WagmiProvider, http } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig, lightTheme } from '@rainbow-me/rainbowkit'

const config = getDefaultConfig({
  appName: 'Kernel Community',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [optimism],
  transports: {
    [optimism.id]: http(),  
  },
})

const queryClient = new QueryClient()

const customTheme = lightTheme({
  accentColor: '#4B5B33',
  accentColorForeground: 'white',
  borderRadius: 'large',
  fontStack: 'system',
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}