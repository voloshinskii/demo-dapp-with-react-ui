import React from "react";
import {OpenContractFieldExtension} from "../transactions/schemas/types";

export interface TxInputProps {
  label: string;
  value: string;
  isRequired?: boolean;
  description?: string;
  onUpdate: (newValue: string) => void;
  modes?: OpenContractFieldExtension[]
  headerText?: ({ value }: { value: string }) => React.ReactNode;
}
