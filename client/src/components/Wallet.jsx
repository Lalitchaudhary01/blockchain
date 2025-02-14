import React, { useEffect, useState } from "react";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const connection = new Connection("https://api.mainnet-beta.solana.com");

function Wallet() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((bal) => {
        setBalance(bal / 1e9);
      });
    }
  }, [publicKey]);

  return (
    <div className="flex flex-col items-center p-6">
      <WalletMultiButton />
      {publicKey && (
        <div className="mt-4">
          <p>Wallet Address: {publicKey.toBase58()}</p>
          <p>Balance: {balance} SOL</p>
        </div>
      )}
    </div>
  );
}

export default Wallet;
