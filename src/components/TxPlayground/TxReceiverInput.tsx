import {MessageDecoder, useMessageDecoderState} from "../../transactions";
import React, {useEffect, useState} from "react";
import {TxInput} from "../TxInput/TxInput";
import {TONApi} from "../../tonapi";
import {Address} from "@ton/core";
import {Box, HStack, Link, Text} from "@chakra-ui/react";
import {mappedSchemas} from "../../transactions/schemas";
import {OpenContractFieldExtension} from "../../transactions/schemas/types";
import {mockPayload} from "../../transactions/decoders";
import {SchemaStandard} from "../Schema";

export interface TxReceiverInputProps {
  message: MessageDecoder;
}

export function TxReceiverInput(props: TxReceiverInputProps) {
  const state = useMessageDecoderState(props.message);
  const [interfaces, setInterfaces] = useState<string[]>([]);

  const describedSchema = mappedSchemas.find(schema => schema.interfaces?.some(interf => interfaces.includes(interf.name)));
  const knownInternals = describedSchema?.internals;

  useEffect(() => {
    async function fetchAccount() {
      const account = await TONApi.accounts.getAccount(Address.parse(state.receiver));
      setInterfaces(account.interfaces ?? []);
    }
    if (state.receiver) {
      fetchAccount();
    }
  }, [state.receiver])

  return (
    <Box my={4}>
      <TxInput headerText={interfaces.length ? () => <span style={{ color: 'var(--chakra-colors-pink-300)' }}>{interfaces.join(',')}</span> : undefined} modes={[OpenContractFieldExtension.InsertAddress]} description={"Receiver's address."} onUpdate={(newValue) => props.message.updateReceiver(newValue)} label={"Receiver"} value={props.message.receiver.toString()} isRequired fieldType={{ kind: "TLBAddressType", addrType: "Any" }} />
      {describedSchema?.standard ? <SchemaStandard standard={describedSchema.standard} /> : null}
      {knownInternals?.length ? (
        <HStack spacing='4px'>
          <Text>
            Known internals:
          </Text>
          <HStack spacing='12px'>
          {knownInternals.map((schema) => <Link onClick={() => props.message.updatePayload(mockPayload(schema.binary, schema.fields))} color='teal.500' key={schema.binary}>{schema.name}</Link>)}
        </HStack>
      </HStack>) : null}
    </Box>
  )
}
