import {Builder, Cell, Slice} from "@ton/core";
import {DecoderImplementation} from "./prototype";

export class CellRefDecoder implements DecoderImplementation {
  constructor(private isMaybe: boolean = false) {
  }
  encodeValue(builder: Builder, decodedValue: string) {
    if (this.isMaybe) {
      return builder.storeMaybeRef(decodedValue ? Cell.fromBase64(decodedValue) : null)
    }
    return builder.storeRef(Cell.fromBase64(decodedValue))
  }
  decodeValue(slice: Slice) {
    if (this.isMaybe) {
      return slice.loadMaybeRef()?.toBoc().toString('base64') ?? null;
    }
    return slice.loadRef().toBoc().toString('base64');
  }

  extendSliceWithMockValue(builder: Builder): Builder {
    if (this.isMaybe) {
      return builder.storeMaybeRef();
    }
    return builder.storeRef(new Cell());
  }
}
