import React, {useMemo} from "react";
import {TxInputProps} from "../../../interfaces/TxInput";
import {BaseInput} from "../Base";
import {OpenContractFieldExtension} from "../../../transactions/schemas/types";
import {FormHelperText, Tooltip} from "@chakra-ui/react";
import {crc32lookupTable} from "../../../utils/crc32lookup";

const validateField = (value: string) => {
  return true;
}

export function Uint64TxInput(props: TxInputProps) {
  const shouldDecodeCrc32 = props.modes?.includes(OpenContractFieldExtension.Crc32Decode);

  const crc32Value = useMemo(() => {
    try {
      if (!shouldDecodeCrc32) {
        return null;
      }

      const crc32 = Number(BigInt(props.value) >> BigInt(32)).toString(16);
      return {hex: crc32, knownString: crc32lookupTable[crc32]};

    } catch (e) {
      console.log(e);
      return null;
    }
  }, [shouldDecodeCrc32, props.value]);

  return (
    <BaseInput description={props.description} onUpdate={props.onUpdate} label={props.label} value={props.value} validateField={validateField}>
      {crc32Value && crc32Value.knownString && <FormHelperText><Tooltip label='Referral-query TEP (draft)' hasArrow arrowSize={15}><span>referral: <b>{crc32Value.knownString}</b></span></Tooltip></FormHelperText>}
    </BaseInput>
  )
}
