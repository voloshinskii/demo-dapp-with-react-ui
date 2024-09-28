import React, {useCallback, useMemo, useState} from 'react';
import ReactJson from 'react-json-view';
import './style.scss';
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {TxPlayground} from "../TxPlayground/TxPlayground";
import {MessagesDecoder} from "../../transactions";

export function useDecoders() {
	return useMemo(() => new MessagesDecoder([{ amount: '50000000', address: 'UQD2NmD_lH5f5u1Kj3KfGyTvhZSX0Eg6qp2a5IQUKXxOGzCi' }]), []);
}

export function TxForm() {
	const wallet = useTonWallet();
	const [tonConnectUi] = useTonConnectUI();
	const decodedMessages = useDecoders();

	return (
		<div className="send-tx-form">
			<h3>Configure and send transaction</h3>
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
