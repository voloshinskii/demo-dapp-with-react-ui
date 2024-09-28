import {Builder, Slice} from "@ton/core";

export interface DecoderImplementation {
  encodeValue(builder: Builder, decodedValue: any): Builder;
  decodeValue(slice: Slice): string | null;
  extendSliceWithMockValue(builder: Builder): Builder;
}
