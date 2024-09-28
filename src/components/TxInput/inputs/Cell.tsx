import React from "react";
import {TxInputProps} from "../../../interfaces/TxInput";
import {BaseInput} from "../Base";

const validateField = (value: string) => {
  return true;
}

export function CellTxInput(props: TxInputProps) {
  return (
    <BaseInput description={props.description} onUpdate={props.onUpdate} label={props.label} value={props.value} validateField={validateField} />
  )
}
