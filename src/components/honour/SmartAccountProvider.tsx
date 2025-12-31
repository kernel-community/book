"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { createSmartWalletClient } from '@account-kit/wallet-client'
import { alchemy, optimism } from '@account-kit/infra'
import { WalletClientSigner } from '@aa-sdk/core'
import { createWalletClient, custom } from 'viem'
import { optimism as optimismViem } from 'viem/chains'
import { getAlchemyApiKey } from '@/utils/alchemyConfig'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SmartWalletClientType = any;

interface SmartAccountContextType {
  smartAccountClient: SmartWalletClientType | null
  smartAccountAddress: string | null
  isInitialized: boolean
  initializeSmartAccount: () => Promise<void>
}

const SmartAccountContext = createContext<SmartAccountContextType | undefined>(undefined)

export const useSmartAccount = () => {
  const context = useContext(SmartAccountContext)
  // Return default values if context is not available (graceful degradation)
  if (!context) {
    return {
      smartAccountClient: null,
      smartAccountAddress: null,
      isInitialized: false,
      initializeSmartAccount: async () => {}
    }
  }
  return context
}

interface SmartAccountProviderProps {
  children: ReactNode
  eoaAddress?: string
}

export const SmartAccountProvider = ({ children, eoaAddress }: SmartAccountProviderProps) => {
  const [smartAccountClient, setSmartAccountClient] = useState<SmartWalletClientType | null>(null)
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize smart account - wrapped in useCallback to prevent unnecessary re-renders
  const initializeSmartAccount = useCallback(async () => {
    // Reset state if prerequisites aren't met
    if (!eoaAddress || !window.ethereum) {
      setSmartAccountClient(null)
      setSmartAccountAddress(null)
      setIsInitialized(false)
      return
    }

    try {
      // Get API key from API route (keeps it secret)
      const alchemyApiKey = await getAlchemyApiKey()
      
      // Check if Alchemy API key is configured - if not, just skip smart account initialization
      if (!alchemyApiKey) {
        setSmartAccountClient(null)
        setSmartAccountAddress(null)
        setIsInitialized(false)
        return
      }
      
      // Create a wallet client for the signer
      const walletClient = createWalletClient({
        chain: optimismViem,
        transport: custom(window.ethereum)
      })
      
      // Create a WalletClientSigner from the wallet client
      const signer = new WalletClientSigner(walletClient, 'metamask')
      
      // Create transport using Alchemy
      const transport = alchemy({
        apiKey: alchemyApiKey
      })
      
      // Create initial client to request account
      const clientWithoutAccount = createSmartWalletClient({
        transport,
        chain: optimism,
        signer
      })
      
      // Request the account (counterfactual address)
      const account = await clientWithoutAccount.requestAccount()
      const address = account.address
      
      // Create the final client with the account address
      const client = createSmartWalletClient({
        transport,
        chain: optimism,
        signer,
        account: address
      })

      setSmartAccountClient(client)
      setSmartAccountAddress(address)
      setIsInitialized(true)
    } catch (error) {
      // Log initialization errors for debugging
      console.error('Smart account initialization error:', error)
      setSmartAccountClient(null)
      setSmartAccountAddress(null)
      setIsInitialized(false)
    }
  }, [eoaAddress])

  // Re-initialize when EOA address changes
  useEffect(() => {
    // Don't try to initialize if there's no EOA address - just reset state
    if (!eoaAddress) {
      setSmartAccountClient(null)
      setSmartAccountAddress(null)
      setIsInitialized(false)
      return
    }

    // Use a flag to prevent multiple simultaneous initializations
    let isMounted = true
    let timeoutId: NodeJS.Timeout | null = null
    
    // Add a small delay to ensure wallet is fully initialized first
    timeoutId = setTimeout(() => {
      const init = async () => {
        if (!isMounted) return
        try {
          await initializeSmartAccount()
        } catch (error: unknown) {
          // Silently catch any errors to prevent breaking the app
          if (isMounted) {
            // Only log if it's not a configuration issue
            const errorMessage = error instanceof Error ? error.message : String(error);
            if (errorMessage && !errorMessage.includes('apiKey') && !errorMessage.includes('Required')) {
              console.error('SmartAccount initialization error (non-blocking):', error)
            }
          }
        }
      }
      
      init()
    }, 100) // Small delay to let wallet context settle
    
    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [eoaAddress, initializeSmartAccount]) // Only depend on eoaAddress since we always use Optimism

  // Update value when state changes
  const contextValue: SmartAccountContextType = {
    smartAccountClient,
    smartAccountAddress,
    isInitialized,
    initializeSmartAccount
  }

  // Always render children - never block rendering even if smart account fails
  return (
    <SmartAccountContext.Provider value={contextValue}>
      {children}
    </SmartAccountContext.Provider>
  )
}

