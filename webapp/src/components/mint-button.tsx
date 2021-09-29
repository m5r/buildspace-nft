import * as React from "react";
import useNFT from "../hooks/use-nft";

export default function MintButton() {
	const { mint, isMinting } = useNFT();

	return (
		<button disabled={isMinting} onClick={mint} className="cta-button connect-wallet-button">
			{isMinting ? "Minting..." : "Mint NFT"}
		</button>
	);
}
