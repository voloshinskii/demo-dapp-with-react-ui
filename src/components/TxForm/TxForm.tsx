import React, {useCallback, useState} from 'react';
import ReactJson from 'react-json-view';
import './style.scss';
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";


const defaultTx = {
	validUntil: Math.floor(Date.now() / 1000) + 600, // unix epoch seconds
	messages: [
		{
			address: '0:881c53b5c4a7cf15e2c885548894daac89cce6625d4b4c768fd0ec67760eaf91',
			amount: '1',
		},
		{
			address: '0:881c53b5c4a7cf15e2c885548894daac89cce6625d4b4c768fd0ec67760eaf91',
			amount: '1',
		},
	],
};

export function TxForm() {
	const [tx, setTx] = useState(defaultTx);
	const wallet = useTonWallet();
	const [tonConnectUi] = useTonConnectUI();

	const onChange = useCallback((value: object) => setTx((value as { updated_src: typeof defaultTx }).updated_src), []);

	return (
		<div className="send-tx-form">
			<h3>Configure and send transaction</h3>
			<ReactJson src={defaultTx} theme="ocean" onEdit={onChange} onAdd={onChange} onDelete={onChange} />
			{wallet ? (
				<button onClick={() => tonConnectUi.sendTransaction(tx)}>
					Send transaction
				</button>
			) : (
				<button onClick={() => tonConnectUi.openModal()}>Connect wallet to send the transaction</button>
			)}
		</div>
	);
}
