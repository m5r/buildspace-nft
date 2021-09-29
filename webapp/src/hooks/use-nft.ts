import { useState, useCallback, useEffect } from "react";
import type { BigNumber } from "ethers";

import useNFTContract from "./use-nft-contract";

export default function useNFT() {
	const [isMinting, setIsMinting] = useState(false);
	const contract = useNFTContract();
	const mint = useCallback(async () => {
		if (!contract || isMinting) {
			return;
		}

		setIsMinting(true);
		console.log("Going to pop wallet now to pay gas...");
		let nftTxn = await contract.makeAnEpicNFT();

		console.log("Mining...please wait.");
		await nftTxn.wait();
		setIsMinting(false);

		console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
	}, [contract, isMinting]);

	useEffect(() => {
		if (!contract) {
			return;
		}

		async function onNewEpicNFTMintedHandler(from: string, tokenId: BigNumber) {
			console.log(from, tokenId.toNumber())
			alert(`Hey there! We've minted your NFT. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: <https://testnets.opensea.io/assets/0x86CCCaCEf374128232F2272D2987dee523bbD964/${tokenId.toNumber()}>`);
		}

		contract.on("NewEpicNFTMinted", onNewEpicNFTMintedHandler);

		return () => void contract.off("NewEpicNFTMinted", onNewEpicNFTMintedHandler);
	}, [contract]);

	return {
		mint,
		isMinting,
	};
}