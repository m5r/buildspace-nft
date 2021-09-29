import { useState, useEffect, useCallback } from "react";

const networks = {
	1: "Mainnet",
	42: "Kovan",
	3: "Ropsten",
	4: "Rinkeby",
	5: "Goerli",
} as const;

export default function useWallet() {
	const [currentAccount, setCurrentAccount] = useState("");
	const [network, setNetwork] = useState<typeof networks[keyof typeof networks] | number | null>(null);

	const checkIfWalletIsConnected = useCallback(async () => {
		const { ethereum } = window;
		if (!ethereum) {
			return;
		}

		const accounts = await ethereum.request({ method: "eth_accounts" });
		if (accounts.length === 0) {
			return;
		}

		const account = accounts[0];
		setCurrentAccount(account);
	}, []);

	const connectWallet = useCallback(async () => {
		const { ethereum } = window;
		if (!ethereum) {
			alert("Get MetaMask!");
			return;
		}

		const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		console.log("accounts", accounts);

		setCurrentAccount(accounts[0]);
	}, []);

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	useEffect(() => {
		const { ethereum } = window;
		if (!ethereum) {
			return;
		}

		const networkVersion = ethereum.networkVersion as number;
		setNetwork(networks[networkVersion as keyof typeof networks] ?? networkVersion);
	}, [currentAccount]);

	return {
		wallet: currentAccount,
		connectWallet,
		network,
	}
}