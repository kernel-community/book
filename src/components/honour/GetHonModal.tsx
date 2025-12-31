"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import ConnectButton from "./ConnectButton";
import { HON_CONTRACT_ADDRESS, HON_ABI, proposer, apiUrl, graphUrl, graphApiToken } from "@/lib/honour";
import { useSmartAccount } from "./SmartAccountProvider";
import { encodeFunctionData } from "viem";
import { getPaymasterCapabilities } from "@/utils/alchemyConfig";
import { X, Loader2 } from "lucide-react";

type GetHonModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onTransactionSuccess?: () => void;
};

const GetHonModal = ({
  isVisible,
  onClose,
  onTransactionSuccess,
}: GetHonModalProps) => {
  const { isConnected } = useAccount();
  const { smartAccountClient, smartAccountAddress, isInitialized } = useSmartAccount();
  const [step, setStep] = useState<"propose" | "accept">("propose");
  const [error, setError] = useState<string | null>(null);
  const [isProposing, setIsProposing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isVisible) {
      setStep("propose");
      setError(null);
      setIsProposing(false);
      setIsConfirming(false);
      setIsConfirmed(false);
    }
  }, [isVisible]);

  // Handle transaction success
  useEffect(() => {
    if (isConfirmed && onTransactionSuccess) {
      // Small delay to ensure blockchain state is updated
      setTimeout(() => {
        onTransactionSuccess();
        onClose();
      }, 1000);
    }
  }, [isConfirmed, onTransactionSuccess, onClose]);

  if (!isVisible) return null;

  // Query subgraph for proposal IDs using smart account address
  const getProposalId = async (): Promise<string | null> => {
    if (!smartAccountAddress) return null;

    let proposalId: string | null = null;
    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 5000;

    while (!proposalId && retryCount < maxRetries) {
      try {
        const query = `
          query GetProposals($account: Bytes!) {
            proposeds(where: { receiver: $account }) {
              id
              proposer
              proposalId
            }
          }
        `;

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        
        // Add Authorization header if token is available
        if (graphApiToken) {
          headers["Authorization"] = `Bearer ${graphApiToken}`;
        }

        const response = await fetch(graphUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({
            query,
            variables: {
              account: smartAccountAddress,
            },
          }),
        });

        const result = await response.json();
        const { data } = result;
        const proposals = data?.proposeds || [];
        
        if (proposals && proposals.length > 0) {
          const proposal = proposals[0];
          proposalId = proposal.proposalId.toString();
        }
      } catch (err) {
        console.error("Error fetching proposal ID:", err);
        setError("There was an error with the subgraph.");
      }

      if (!proposalId) {
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    if (!proposalId) {
      setError("There was an error. Please try again later.");
    }

    return proposalId;
  };

  // Call API to propose HON using smart account address
  const handlePropose = async () => {
    if (!smartAccountAddress || !isInitialized) {
      setError("Smart account not initialized. Please wait...");
      return;
    }

    setIsProposing(true);
    setError(null);

    try {
      // API expects headers, not body - use smart account address
      const response = await fetch(apiUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          amount: "1",
          address: smartAccountAddress,
        },
      });

      if (response.status === 200) {
        setStep("accept");
      } else {
        throw new Error("Failed to propose HON");
      }
    } catch (err) {
      console.error("Error proposing HON:", err);
      setError(err instanceof Error ? err.message : "Failed to propose HON");
      setStep("propose");
    } finally {
      setIsProposing(false);
    }
  };

  // Accept the proposal using smart account (sponsored transaction)
  const handleAccept = async () => {
    if (!smartAccountClient || !smartAccountAddress || !isInitialized) {
      setError("Smart account not initialized. Please wait...");
      return;
    }

    try {
      setError(null);
      setIsProposing(true);
      setIsConfirming(false);
      
      // Get proposal ID first
      const id = await getProposalId();
      
      if (!id) {
        setError("Could not find proposal. Please try again.");
        setIsProposing(false);
        return;
      }

      // Get paymaster capabilities from API route (keeps policy ID secret)
      const paymasterCapabilities = await getPaymasterCapabilities();
      
      if (!paymasterCapabilities) {
        setError("Gas sponsorship policy not configured. Please contact support.");
        setIsProposing(false);
        return;
      }

      // Encode the honour function call
      const callData = encodeFunctionData({
        abi: HON_ABI,
        functionName: "honour",
        args: [proposer as `0x${string}`, BigInt(id)],
      });

      // Use sendCalls which handles prepare, sign, and send in one call
      // The client already has the account configured
      setIsConfirming(true);
      const result = await smartAccountClient.sendCalls({
        calls: [{
          to: HON_CONTRACT_ADDRESS as `0x${string}`,
          value: '0x0',
          data: callData as `0x${string}`
        }],
        capabilities: paymasterCapabilities
      });
      
      const callId = result.preparedCallIds?.[0] || result.ids?.[0];
      
      if (!callId) {
        throw new Error('No call ID returned from sendCalls');
      }
      
      // Poll for status 200 (confirmed) to get the transaction hash
      let txHash: string | null = null;
      let attempts = 0;
      const maxAttempts = 60;
      
      while (!txHash && attempts < maxAttempts) {
        const status = await smartAccountClient.getCallsStatus(callId) as {
          status?: number | string;
          error?: string;
          message?: string;
          details?: {
            data?: {
              hash?: string;
            };
          };
        };
        
        if (status.status === 200) {
          txHash = status.details?.data?.hash ?? null;
          if (txHash) {
            break;
          }
        }
        
        if (status.status === 'FAILED' || status.error || (typeof status.status === 'number' && status.status >= 400)) {
          throw new Error(status.error || status.message || 'Transaction failed');
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      }
      
      if (!txHash) {
        throw new Error(`Transaction hash not found after ${maxAttempts} seconds`);
      }
      
      // Transaction is confirmed (status 200), so we're done
      setIsConfirmed(true);
      setIsProposing(false);
      setIsConfirming(false);
    } catch (err) {
      console.error("Error accepting proposal:", err);
      setError(err instanceof Error ? err.message : "Failed to accept proposal");
      setIsProposing(false);
      setIsConfirming(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Get HON Tokens</h2>

        {!isConnected ? (
          <div className="space-y-4">
            <p className="text-gray-700">
              Connect your wallet to get HON tokens. We&apos;ll create a smart account for you on Optimism.
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        ) : !isInitialized ? (
          <div className="space-y-4">
            <p className="text-gray-700">
              Setting up your smart account on Optimism...
            </p>
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#4B5B33]" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {step === "propose" && (
              <>
                <p className="text-gray-700">
                  HON is consensual. Ask for some, we&apos;ll prepare it, then you can accept it.
                </p>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                <button
                  onClick={handlePropose}
                  disabled={isProposing}
                  className="w-full bg-[#4B5B33] text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProposing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Proposing...
                    </>
                  ) : (
                    "Ask"
                  )}
                </button>
              </>
            )}

            {step === "accept" && (
              <>
                <p className="text-gray-700">
                  You can now click the button below to accept your new HON tokens.
                </p>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                <button
                  onClick={handleAccept}
                  disabled={isProposing || isConfirming}
                  className="w-full bg-[#4B5B33] text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProposing || isConfirming ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isConfirming ? "Confirming..." : "Loading..."}
                    </>
                  ) : (
                    "Honour"
                  )}
                </button>
                {isConfirming && (
                  <p className="text-sm text-gray-600 text-center">
                    Transaction submitted. Waiting for confirmation...
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetHonModal;

