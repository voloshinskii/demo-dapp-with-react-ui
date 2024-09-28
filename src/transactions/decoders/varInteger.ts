import {Builder, Slice} from "@ton/core";
import {DecoderImplementation} from "./prototype";
import {TLBMathExpr} from "../../tlb/tlb-codegen/ast";

export class VarIntegerDecoder implements DecoderImplementation {
  private varInteger: number = 16;
  constructor(private n: TLBMathExpr) {

  }
  encodeValue(builder: Builder, decodedValue: any) {
    return builder.storeUint(decodedValue, this.varInteger * 8);
  }
  decodeValue(slice: Slice) {
    return slice.loadUintBig(this.varInteger * 8).toString();
  }

  extendSliceWithMockValue(builder: Builder): Builder {
    return this.encodeValue(builder, 1);
  }
}
