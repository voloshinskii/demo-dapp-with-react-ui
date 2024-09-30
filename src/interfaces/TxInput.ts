import React from "react";
import {OpenContractFieldExtension} from "../transactions/schemas/types";

export interface TxInputProps {
  label: string;
  value: any;
  isRequired?: boolean;
  description?: string;
  onUpdate: (newValue: any) => void;
  modes?: OpenContractFieldExtension[]
  headerText?: ({ value }: { value: string }) => React.ReactNode;
}
