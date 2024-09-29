import React from "react";
import {TxInputProps} from "../../../interfaces/TxInput";
import {BaseInput} from "../Base";
import {isBase64} from "../../../utils";

const validateField = (value: string) => {
  return isBase64(value);
}

export function CellTxInput(props: TxInputProps) {
  return (
    <BaseInput description={props.description} onUpdate={props.onUpdate} label={props.label} value={props.value} validateField={validateField} />
  )
}
