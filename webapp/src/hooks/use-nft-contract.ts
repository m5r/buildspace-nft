import useContract from "./use-contract";

import epicNFT from "../utils/MyEpicNFT.json";

export default function useNFTContract() {
	return useContract({
		address: "0x86CCCaCEf374128232F2272D2987dee523bbD964",
		abi: epicNFT.abi,
	});
}
