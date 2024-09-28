import React, {useCallback, useState, ChangeEvent, useMemo, useEffect} from "react";
import { TxInputProps } from "../../interfaces/TxInput";
import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

export interface BaseInputProps {
  validateField: (newValue: string) => boolean;
  helperText?: React.ReactNode;
  headerText?: ({ value }: { value: string }) => React.ReactNode;
}

export function BaseInput(props: TxInputProps & BaseInputProps) {
  const [value, setValue] = useState(props.value);
  const [isErrored, setIsErrored] = useState(false);

  const headerText = useMemo(() => {
    return props.headerText?.({ value });
  }, [value, props.headerText])

  const onUpdateField = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setValue(updatedValue);

    const isValidValue = props.validateField(updatedValue);
    setIsErrored(!isValidValue);
    if (isValidValue) {
      props.onUpdate(updatedValue);
    }
  }, [props.validateField, props.onUpdate]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <FormControl isInvalid={isErrored} isRequired={props.isRequired} my={8}>
      <FormLabel>{props.label} {headerText}</FormLabel>
      <Input value={value} onChange={onUpdateField} type='text' />
      {props.helperText ?? <FormHelperText>{props.description}</FormHelperText>}
    </FormControl>
  )
}
