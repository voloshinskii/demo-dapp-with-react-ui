import React, {useEffect, useMemo} from 'react';
import './style.scss';
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {TxPlayground} from "../TxPlayground/TxPlayground";
import {MessagesDecoder, useDecoderEncodedState} from "../../transactions";

export function useDecoders() {
	return useMemo(() => {
		const encodedJSON = new URLSearchParams(window.location.search).get("encoded");

		if (encodedJSON === null) {
			return new MessagesDecoder([{ amount: '50000000', address: 'UQD2NmD_lH5f5u1Kj3KfGyTvhZSX0Eg6qp2a5IQUKXxOGzCi' }])
		}

		return MessagesDecoder.initFromBase64(encodedJSON);
	}, []);
}

export function useURLUpdater(decoder: MessagesDecoder) {
	const messages = useDecoderEncodedState(decoder);

	useEffect(() => {
		const encodedJSON = decoder.encodeMessagesJSONToBase64();
		let searchParams = new URLSearchParams(window.location.search);
		searchParams.set("encoded", encodedJSON);
		window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
	}, [messages]);

	return null;
}

export function TxForm() {
	const wallet = useTonWallet();
	const [tonConnectUi] = useTonConnectUI();
	const decodedMessages = useDecoders();

	useURLUpdater(decodedMessages);

	return (
		<div className="send-tx-form">
			<TxPlayground decoder={decodedMessages} />
			{wallet ? (
				<button onClick={() => tonConnectUi.sendTransaction({ validUntil: Math.floor(Date.now() / 1000) + 600, messages: decodedMessages.getTonconnectMessages() })}>
					Send transaction
				</button>
			) : (
				<button onClick={() => tonConnectUi.openModal()}>Connect wallet to send the transaction</button>
			)}
		</div>
	);
}
