"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import ConnectButton from "./ConnectButton";
import GetHonModal from "./GetHonModal";
import Button from "@/components/ui/Button";

type HonourButtonProps = {
  onTransactionSuccess?: () => void;
};

const HonourButton = ({ onTransactionSuccess }: HonourButtonProps) => {
  const { isConnected } = useAccount();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTransactionSuccess = () => {
    setIsModalVisible(false);
    onTransactionSuccess?.();
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {!isConnected ? (
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700 mb-4">
            Connect your wallet to view this content
          </p>
          <ConnectButton />
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700 mb-4">
            You need at least 1 HON token to view this content
          </p>
          <Button
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Get HON
          </Button>
        </div>
      )}

      {isModalVisible && (
        <GetHonModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onTransactionSuccess={handleTransactionSuccess}
        />
      )}
    </div>
  );
};

export default HonourButton;

