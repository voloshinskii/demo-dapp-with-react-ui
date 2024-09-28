import {DecoderImplementation} from "./prototype";
import {AddressDecoder} from "./address";
import {CoinsDecoder} from "./coins";
import {CellDecoder} from "./cell";
import {CellRefDecoder} from "./cellRef";
import {UintDecoder} from "./uint";
import {TLBFieldType} from "../../tlb/tlb-codegen/ast";
import {VarIntegerDecoder} from "./varInteger";
import {FulfilledOpenContractInternalField} from "../../tlb/tlb-codegen/main";
import {Builder} from "@ton/core";
import BigNumber from "bignumber.js";

export function getTLBDecoder(tlbType: TLBFieldType): DecoderImplementation {
  switch (tlbType.kind) {
    case "TLBAddressType":
      return new AddressDecoder();
    case "TLBCoinsType":
      return new CoinsDecoder();
    case "TLBCellInsideType":
      return new CellDecoder();
    case "TLBNamedType":
      return new CellRefDecoder();
    case "TLBNumberType":
      // TODO: fix ?? 64
      return new UintDecoder(tlbType.maxBits ?? 64);
    case "TLBVarIntegerType":
      return new VarIntegerDecoder(tlbType.n);
    default:
      throw Error(`Decoder for kind ${tlbType.kind} is not currently supported. You can contribute to our repository!`);
  }
}

export const mockPayload = (binary: string, fields: FulfilledOpenContractInternalField[]) => {
  return fields.reduce((builder, field) => getTLBDecoder(field.fieldType).extendSliceWithMockValue(builder), new Builder().storeUint(new BigNumber(binary, 16).toNumber(), 32)).endCell().toBoc().toString('base64');
}
