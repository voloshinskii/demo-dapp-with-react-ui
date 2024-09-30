import React from "react";
import {TxInputProps} from "../../interfaces/TxInput";
import {AddressTxInput, CellTxInput, CoinsTxInput, Uint64TxInput} from "./inputs";
import {TLBFieldType} from "../../tlb/tlb-codegen/ast";
import {RawTxInput} from "./inputs/Raw";
import {BoolTxInput} from "./inputs/Bool";

export function TxInput(props: TxInputProps & { fieldType: TLBFieldType }) {
  const { fieldType, ...restProps } = props;

  switch (fieldType.kind) {
    case "TLBAddressType":
      return <AddressTxInput {...restProps} />;
    case "TLBCoinsType":
      return <CoinsTxInput {...restProps} />;
    case "TLBNumberType":
      return <Uint64TxInput {...restProps} />;
    case "TLBNamedType":
      return <CellTxInput {...restProps} />;
    case "TLBCellRefType":
      return <CellTxInput {...restProps} />;
    case "TLBBoolType":
      return <BoolTxInput {...restProps} />;
    default:
      return <RawTxInput {...restProps} />;
  }
}
