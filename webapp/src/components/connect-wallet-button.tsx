import * as React from "react";
import useWallet from "../hooks/use-wallet";

export default function ConnectWalletButton() {
	const { connectWallet } = useWallet();

	return (
		<button onClick={connectWallet} className="cta-button connect-wallet-button">
			Connect to Wallet
		</button>
	);
}
