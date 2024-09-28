import {Builder, Slice} from "@ton/core";
import {DecoderImplementation} from "./prototype";

export class UintDecoder implements DecoderImplementation {
  constructor(private bits: number) {
  }
  encodeValue(builder: Builder, decodedValue: any) {
    return builder.storeUint(decodedValue, this.bits);
  }
  decodeValue(slice: Slice) {
    return slice.loadUintBig(this.bits).toString();
  }
  extendSliceWithMockValue(builder: Builder): Builder {
    return builder.storeUint(1, this.bits);
  }
}
