import {MessageDecoder, useMessageDecoderState} from "../../transactions";
import React, {useEffect, useState} from "react";
import {TxInput} from "../TxInput/TxInput";
import {TONApi} from "../../tonapi";
import {Address} from "@ton/core";
import {Box, HStack, Link, Text} from "@chakra-ui/react";
import {mappedSchemas} from "../../transactions/schemas";
import {OpenContractFieldExtension} from "../../transactions/schemas/types";
import {mockPayload} from "../../transactions/decoders";

export interface TxReceiverInputProps {
  message: MessageDecoder;
}

export function TxReceiverInput(props: TxReceiverInputProps) {
  const state = useMessageDecoderState(props.message);
  const [interfaces, setInterfaces] = useState<string[]>([]);

  const knownInternals = mappedSchemas.find(schema => schema.interfaces?.some(interf => interfaces.includes(interf.name)))?.internals;

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
      {knownInternals?.length ? <HStack spacing='12px'>
        <Text>
          Known internals:
        </Text>
        {knownInternals.map((schema) => <Link onClick={() => props.message.updatePayload(mockPayload(schema.binary, schema.fields))} color='teal.500' key={schema.binary}>{schema.name}</Link>)}
      </HStack> : null}
    </Box>
  )
}
