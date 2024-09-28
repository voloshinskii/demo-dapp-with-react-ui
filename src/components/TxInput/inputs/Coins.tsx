import React from "react";
import {TxInputProps} from "../../../interfaces/TxInput";
import {BaseInput} from "../Base";
import {fromNano} from "@ton/core";
import {OpenContractFieldExtension} from "../../../transactions/schemas/types";

const validateField = (value: string) => {
  return true;
}

export function CoinsTxInput(props: TxInputProps) {
  const isTon = props.modes?.includes(OpenContractFieldExtension.TonTransfer);
  return (
    <BaseInput description={props.description} headerText={isTon ? ({ value }) => <span style={{ color: 'var(--chakra-colors-teal-500)' }}>({fromNano(value)} TON)</span> : undefined} onUpdate={props.onUpdate} label={props.label} value={props.value} validateField={validateField} />
  )
}
