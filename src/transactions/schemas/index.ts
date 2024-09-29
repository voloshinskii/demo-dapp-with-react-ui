import jettonSpec from "./jetton.json";
import nftSpec from "./nft.json";
import { OpenContractSpec } from "./types";
import { fulfillInternal } from "../../tlb/tlb-codegen/main";

const schemas: OpenContractSpec[] = [
  jettonSpec as OpenContractSpec,
  nftSpec as OpenContractSpec,
];

export const mappedSchemas = schemas.map(schema => ({...schema, internals: schema.internals?.map(internal => fulfillInternal(internal)) }))
