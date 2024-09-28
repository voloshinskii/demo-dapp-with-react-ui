import {Builder, Cell, Slice} from "@ton/core";
import {DecoderImplementation} from "./prototype";

export class CellDecoder implements DecoderImplementation {
  encodeValue(builder: Builder, decodedValue: string) {
    return builder.storeSlice(Cell.fromBase64(decodedValue).asSlice());
  }
  decodeValue(slice: Slice) {
    return slice.asCell().toBoc().toString();
  }
  extendSliceWithMockValue(builder: Builder): Builder {
    return builder.storeSlice(new Builder().asSlice());
  }
}
