import React from "react";
import {FulfilledOpenContractInternal} from "../../tlb/tlb-codegen/main";
import {PrismCodeTLB} from "../../prism";

export interface TxDeclarationProps {
  schema: FulfilledOpenContractInternal | undefined;
}

export function TxDeclaration(props: TxDeclarationProps) {
  if (!props.schema) {
    return null;
  }
  return (
    <PrismCodeTLB>
      {props.schema.tlb}
    </PrismCodeTLB>
  );
}
