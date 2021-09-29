import useContract from "./use-contract";

import epicNFT from "../utils/MyEpicNFT.json";

export default function useNFTContract() {
	return useContract({
		address: "0x37484D156420B221C367e77483e21161f9e831b8",
		abi: epicNFT.abi,
	});
}
