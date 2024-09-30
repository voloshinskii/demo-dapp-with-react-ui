import React from "react";
import {TxInputProps} from "../../../interfaces/TxInput";
import {Checkbox, FormControl, FormLabel} from "@chakra-ui/react";

export function BoolTxInput(props: TxInputProps) {
  return (
    <FormControl isRequired={props.isRequired} my={8}>
      <FormLabel>{props.label}</FormLabel>
      <Checkbox defaultChecked={props.value} colorScheme='teal' size='lg' value={props.value} onChange={e => props.onUpdate(e.target.checked)} />
    </FormControl>
  )
}
