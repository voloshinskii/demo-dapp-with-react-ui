import React from "react";
import {TxInputProps} from "../../../interfaces/TxInput";
import {BaseInput} from "../Base";
import {Address} from "@ton/core";
import {FormHelperText, Link} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

const validateField = (value: string) => {
  return true;
}

export function RawTxInput(props: TxInputProps) {
  const {description, label, ...restProps } = props;
  return (
    <BaseInput
      label={`${label} (RAW VALUE. INPUT IS NOT IMPLEMENTED)`}
      validateField={validateField}
      {...restProps}
    />
  )
}
