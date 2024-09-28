import React from "react";
import {TxInputProps} from "../../../interfaces/TxInput";
import {BaseInput} from "../Base";
import {Address} from "@ton/core";
import {FormHelperText, Link} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

const validateField = (value: string) => {
  try {
    Address.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function AddressTxInput(props: TxInputProps) {
  const {description, ...restProps } = props;
  return (
    <BaseInput
      validateField={validateField}
      helperText={
        <FormHelperText>
          {description}
          {' '}
          <Link isExternal href={`https://tonviewer.com/${props.value}`} color='teal.500'>View address on Tonviewer <ExternalLinkIcon mx='2px' /></Link>
        </FormHelperText>
      }
      {...restProps}
    />
  )
}
