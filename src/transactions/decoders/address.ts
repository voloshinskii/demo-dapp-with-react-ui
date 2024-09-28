import {Address, Builder, Slice} from "@ton/core";
import {DecoderImplementation} from "./prototype";

export class AddressDecoder implements DecoderImplementation {
  encodeValue(builder: Builder, decodedValue: string) {
    return builder.storeAddress(Address.parse(decodedValue));
  }
  decodeValue(slice: Slice) {
    return slice.loadAddress().toString();
  }
  extendSliceWithMockValue(builder: Builder): Builder {
    return builder.storeAddress(Address.parse("UQD2NmD_lH5f5u1Kj3KfGyTvhZSX0Eg6qp2a5IQUKXxOGzCi"));
  }
}
