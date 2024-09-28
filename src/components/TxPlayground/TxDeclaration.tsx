import { Code } from "@chakra-ui/react";
import React from "react";
import {FulfilledOpenContractInternal} from "../../tlb/tlb-codegen/main";

export interface TxDeclarationProps {
  schema: FulfilledOpenContractInternal | undefined;
}

export function TxDeclaration(props: TxDeclarationProps) {
  if (!props.schema) {
    return null;
  }
  return (
    <Code>
      {props.schema.tlb}
    </Code>
  );
}
