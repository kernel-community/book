"use client";

import { useState, useEffect, ReactNode } from "react";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";
import { HON_CONTRACT_ADDRESS, ERC20_ABI, optimism } from "@/lib/honour";
import { useSmartAccount } from "./SmartAccountProvider";
import HonourButton from "./HonourButton";

type HonourGateProps = {
  children: ReactNode;
};

const HonourGate = ({ children }: HonourGateProps) => {
  const { address, isConnected } = useAccount();
  const { smartAccountAddress, isInitialized } = useSmartAccount();
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  // Use smart account address if available, otherwise fall back to EOA address
  const accountAddress = (smartAccountAddress || address) as `0x${string}` | undefined;

  // Check balance on Optimism using smart account address
  const { data: balance, refetch, isLoading } = useReadContract({
    address: HON_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: accountAddress ? [accountAddress] : undefined,
    chainId: optimism.id,
    query: {
      enabled: isConnected && !!accountAddress && (smartAccountAddress ? isInitialized : true),
    },
  });

  // Refetch balance when address changes or after transaction success
  useEffect(() => {
    if (isConnected && accountAddress && (smartAccountAddress ? isInitialized : true)) {
      refetch();
    }
  }, [accountAddress, isConnected, isInitialized, smartAccountAddress, refetch]);

  // Refetch after transaction success - add a small delay to allow blockchain to update
  useEffect(() => {
    if (transactionSuccess && isConnected && accountAddress) {
      const timer = setTimeout(() => {
        refetch();
      }, 2000); // Wait 2 seconds for blockchain to update
      return () => clearTimeout(timer);
    }
  }, [transactionSuccess, isConnected, accountAddress, refetch]);

  const formattedBalance = balance ? formatEther(balance as bigint) : "0.0";
  const hasHon = parseFloat(formattedBalance) >= 1.0;

  // Show content if they have HON or if transaction was successful
  // Wait for smart account initialization if using smart account
  const isReady = smartAccountAddress ? isInitialized : true;
  if (transactionSuccess || (isConnected && !isLoading && isReady && hasHon)) {
    return <>{children}</>;
  }

  // Show button/modal to get HON
  return (
    <div className="my-8">
      <HonourButton onTransactionSuccess={() => setTransactionSuccess(true)} />
    </div>
  );
};

export default HonourGate;


