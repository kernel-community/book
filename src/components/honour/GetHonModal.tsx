"use client";

import { useState, useEffect } from "react";
import { useAccount, useChainId, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { optimism as optimismChain } from "wagmi/chains";
import ConnectButton from "./ConnectButton";
import { HON_CONTRACT_ADDRESS, HON_ABI, proposer, apiUrl, graphUrl, graphApiToken } from "@/lib/honour";
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
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [step, setStep] = useState<"propose" | "accept">("propose");
  const [error, setError] = useState<string | null>(null);
  const [isProposing, setIsProposing] = useState(false);

  const { writeContract, data: hash, isPending: isAccepting } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isVisible) {
      setStep("propose");
      setError(null);
      setIsProposing(false);
    }
  }, [isVisible]);

  // Update isProposing when transaction is pending
  useEffect(() => {
    if (isAccepting || isConfirming) {
      setIsProposing(true);
    } else if (isConfirmed) {
      setIsProposing(false);
    }
  }, [isAccepting, isConfirming, isConfirmed]);

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

  const handleSwitchNetwork = async () => {
    try {
      await switchChain({ chainId: optimismChain.id });
    } catch (err) {
      console.error("Error switching network:", err);
      setError("Failed to switch network. Please switch to Optimism manually.");
    }
  };

  const isOnOptimism = chainId === optimismChain.id;

  // Query subgraph for proposal IDs (matching old implementation)
  const getProposalId = async (): Promise<string | null> => {
    if (!address) return null;

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
              account: address,
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

  // Call API to propose HON
  const handlePropose = async () => {
    if (!address || !isOnOptimism) return;

    setIsProposing(true);
    setError(null);

    try {
      // API expects headers, not body (matching the old implementation)
      const response = await fetch(apiUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          amount: "1",
          address: address,
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

  // Accept the proposal (using honour function like the old implementation)
  const handleAccept = async () => {
    if (!address || !isOnOptimism) {
      setError("Please ensure you're on Optimism network");
      return;
    }

    try {
      setError(null);
      setIsProposing(true);
      
      // Get proposal ID first
      const id = await getProposalId();
      
      if (!id) {
        setError("Could not find proposal. Please try again.");
        setIsProposing(false);
        return;
      }

      // Call honour function (not accept) - matching old implementation
      await writeContract({
        address: HON_CONTRACT_ADDRESS as `0x${string}`,
        abi: HON_ABI,
        functionName: "honour",
        args: [proposer as `0x${string}`, BigInt(id)],
        chainId: optimismChain.id,
      });
    } catch (err) {
      console.error("Error accepting proposal:", err);
      setError(err instanceof Error ? err.message : "Failed to accept proposal");
      setIsProposing(false);
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
              Connect your wallet to get HON tokens on Optimism.
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        ) : !isOnOptimism ? (
          <div className="space-y-4">
            <p className="text-gray-700">
              Please switch to Optimism network to get HON tokens.
            </p>
            <button
              onClick={handleSwitchNetwork}
              className="w-full bg-[#4B5B33] text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              Switch to Optimism
            </button>
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
                  disabled={isProposing || isAccepting || isConfirming}
                  className="w-full bg-[#4B5B33] text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProposing || isAccepting || isConfirming ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isConfirming ? "Confirming..." : isAccepting ? "Accepting..." : "Loading..."}
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

