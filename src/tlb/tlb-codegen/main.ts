import { ast, Program } from "@ton-community/tlb-parser";
import {TLBCode, TLBField} from "./ast";
import {
  TLBCodeBuild,
  TLBTypeBuild,
} from "./astbuilder/utils";
import { convertCodeToReadonly } from "./astbuilder/fill_constructors";
import { fillConstructors } from "./astbuilder/fill_constructors";
import {OpenContractInternal, OpenContractInternalField} from "../../transactions/schemas/types";

export function getTLBCodeByAST(tree: Program, input: string) {
  let oldTlbCode: TLBCodeBuild = { types: new Map<string, TLBTypeBuild>() };
  let splittedInput = input.split("\n");
  fillConstructors(tree.declarations, oldTlbCode, splittedInput);
  let tlbCode: TLBCode = convertCodeToReadonly(oldTlbCode);

  return tlbCode;
}

export type FulfilledOpenContractInternalField = OpenContractInternalField & TLBField;

export interface FulfilledOpenContractInternal extends OpenContractInternal {
  binary: string;
  fields: FulfilledOpenContractInternalField[];
}

export function fulfillInternal(internal: OpenContractInternal): FulfilledOpenContractInternal {
  const tree = ast(internal.tlb);
  let tlbCode = getTLBCodeByAST(tree, internal.tlb)

  // @ts-ignore
  const constructor = Array.from(tlbCode.types).find(([key, tlbType]) => tlbType.name === 'InternalMsgBody')[1].constructors[0];

  return Object.assign(internal, { binary: constructor.tag.binary, fields: constructor.fields.map(field => Object.assign(field, internal.fields?.find(item => item.name === field.name))) });
}
