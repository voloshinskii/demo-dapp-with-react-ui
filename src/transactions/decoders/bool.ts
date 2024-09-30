import {Builder, Slice} from "@ton/core";
import {DecoderImplementation} from "./prototype";
import {TLBMathExpr} from "../../tlb/tlb-codegen/ast";

export class BoolDecoder implements DecoderImplementation {
  encodeValue(builder: Builder, decodedValue: boolean) {
    return builder.storeBit(decodedValue);
  }
  decodeValue(slice: Slice) {
    return slice.loadBit();
  }

  extendSliceWithMockValue(builder: Builder): Builder {
    return this.encodeValue(builder, true);
  }
}
