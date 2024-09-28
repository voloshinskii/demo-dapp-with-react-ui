import {Builder, Slice} from "@ton/core";
import {DecoderImplementation} from "./prototype";

export class CoinsDecoder implements DecoderImplementation {
  encodeValue(builder: Builder, decodedValue: string) {
    return builder.storeCoins(BigInt(decodedValue));
  }
  decodeValue(slice: Slice) {
    return slice.loadCoins().toString();
  }
  extendSliceWithMockValue(builder: Builder): Builder {
    return builder.storeCoins(1);
  }
}
