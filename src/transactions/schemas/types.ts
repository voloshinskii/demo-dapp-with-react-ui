type TLBString = string;

interface OpenContractAuthor {
  name: string;
  url?: string;
}

interface OpenContractStandard {
  authors?: OpenContractAuthor[];
  url?: string;
}

interface OpenContractGetMethods {
  name: string;

}

interface OpenContractInterface {
  name: string;
  get_methods?: OpenContractGetMethods[];
}

export enum OpenContractFieldExtension {
  TonTransfer = 'ton_transfer',
  InsertAddress = 'insert_address',
  Crc32Decode = 'crc32_decode',
}

export interface OpenContractInternalField {
  name: string;
  description?: string;
  input_modes?: OpenContractFieldExtension[];
}

export interface OpenContractInternal {
  tlb: TLBString;
  name?: string;
  fields?: OpenContractInternalField[];
}

export interface OpenContractSpec {
  /*
    OpenContract version. Semver compliant
   */
  OpenContract: string;
  title?: string;
  standard?: OpenContractStandard;
  interfaces?: OpenContractInterface[];
  types?: TLBString[];
  internals?: OpenContractInternal[];
}
