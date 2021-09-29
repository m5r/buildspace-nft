import { useState, useCallback } from "react";
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

	return {
		mint,
		isMinting,
	};
}