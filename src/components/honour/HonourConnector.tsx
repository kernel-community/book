"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";
import { HON_CONTRACT_ADDRESS, ERC20_ABI, optimism } from "@/lib/honour";
import HonourContent from "./HonourContent";
import HonourButton from "./HonourButton";

const HonourConnector = () => {
  const { address, isConnected } = useAccount();
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  // Check balance on Optimism regardless of current chain
  const { data: balance, refetch, isLoading } = useReadContract({
    address: HON_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: optimism.id,
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Refetch balance when address changes or after transaction success
  useEffect(() => {
    if (isConnected && address) {
      refetch();
    }
  }, [address, isConnected, refetch]);

  // Refetch after transaction success - add a small delay to allow blockchain to update
  useEffect(() => {
    if (transactionSuccess && isConnected && address) {
      const timer = setTimeout(() => {
        refetch();
      }, 2000); // Wait 2 seconds for blockchain to update
      return () => clearTimeout(timer);
    }
  }, [transactionSuccess, isConnected, address, refetch]);

  const formattedBalance = balance ? formatEther(balance as bigint) : "0.0";
  const hasHon = parseFloat(formattedBalance) >= 1.0;

  // Show content if they have HON or if transaction was successful
  if (transactionSuccess || (isConnected && !isLoading && hasHon)) {
    return <HonourContent balance={formattedBalance} />;
  }

  // Show button/modal to get HON
  return <HonourButton onTransactionSuccess={() => setTransactionSuccess(true)} />;
};

export default HonourConnector;

