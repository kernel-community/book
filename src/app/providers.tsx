'use client'

import { WagmiProvider, http } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig, lightTheme } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { SmartAccountProvider } from '@/components/honour/SmartAccountProvider'

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

function SmartAccountWrapper({ children }: { children: React.ReactNode }) {
  const { address } = useAccount()
  return (
    <SmartAccountProvider eoaAddress={address}>
      {children}
    </SmartAccountProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          <SmartAccountWrapper>
            {children}
          </SmartAccountWrapper>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}