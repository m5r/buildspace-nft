import * as React from "react";
import useNFT from "../hooks/use-nft";
import useWallet from "../hooks/use-wallet";

export default function MintButton() {
	const { mint, isMinting } = useNFT();
	const { network } = useWallet();
	const isDisabled = isMinting || network !== "Rinkeby";

	return (
		<>
			{network !== "Rinkeby" ? (
				<div style={{ color: "darkred", margin: "16px 0" }}>
					Your wallet is connected to the wrong network. Please connect it to the Rinkeby testnet.
				</div>
			) : null}
			<button disabled={isDisabled} onClick={mint} className="cta-button connect-wallet-button">
				{isMinting ? "Minting..." : "Mint NFT"}
			</button>
		</>
	);
}
