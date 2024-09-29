import React, {useCallback, useEffect, useState} from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  TabPanel,
  TabPanels
} from "@chakra-ui/react";
import {MessageDecoder, MessagesDecoder, useDecoderMessages, useMessageDecoderState} from "../../transactions";
import {TxInput} from "../TxInput/TxInput";
import {TxDeclaration} from "./TxDeclaration";
import {TxReceiverInput} from "./TxReceiverInput";
import {AddIcon, DeleteIcon} from "@chakra-ui/icons";
import {OpenContractFieldExtension} from "../../transactions/schemas/types";

export interface TxBodyProps {
  decodedMessages: MessagesDecoder;
  onAddMessage: () => void;
  onDeleteMessage: (decoder: MessageDecoder) => void;
}

export function MessageBody(props: { message: MessageDecoder;  onAddMessage: () => void;
  onDeleteMessage: (decoder: MessageDecoder) => void; }) {
  const state = useMessageDecoderState(props.message);
  const [tlbInputs, setTlbInputs] = useState<JSX.Element[] | null>(null)

  const updateTlbInputs = useCallback(() => {
    if (!state.loadedSchema) {
      setTlbInputs(null);
      return;
    }

    const inputs = state.loadedSchema.fields.map(tlbPart => (
      <TxInput modes={tlbPart.input_modes} key={tlbPart.name} description={tlbPart.description} onUpdate={(newValue) => props.message.updateFieldValue(tlbPart.name, newValue)} label={tlbPart.name} value={props.message.getFieldValue(tlbPart.name)} fieldType={tlbPart.fieldType} />
    ));
    setTlbInputs(inputs);
  }, [state.payload]);

  useEffect(() => {
    // We should refresh inputs when new schema is loaded
    updateTlbInputs();
  }, [updateTlbInputs]);

  return (
    <TabPanel>
      <ButtonGroup spacing='2'>
        <Button onClick={props.onAddMessage} leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>Add new internal</Button>
        <Button onClick={() => props.onDeleteMessage(props.message)} leftIcon={<DeleteIcon />} colorScheme='red' variant='outline'>Remove current</Button>
      </ButtonGroup>
      <TxReceiverInput message={props.message} />
      <TxInput modes={[OpenContractFieldExtension.TonTransfer]} label={"Send amount"} onUpdate={(newValue) => props.message.updateAmount(newValue)} value={props.message.amount.toString()} isRequired fieldType={{ kind: "TLBCoinsType" }} />
      <FormControl my={8}>
        <FormLabel>Raw init</FormLabel>
        <Input
          onChange={(e) => {
            props.message.updateInit(e.target.value);
            updateTlbInputs();
          }}
          value={props.message.init} type='string'
        />
      </FormControl>
      <FormControl my={8}>
        <FormLabel>Raw payload</FormLabel>
        <Input
          onChange={(e) => {
            props.message.updatePayload(e.target.value);
            updateTlbInputs();
          }}
          value={state.payload} type='string'
        />
        <FormHelperText>Base64-encoded payload string</FormHelperText>
      </FormControl>
      <TxDeclaration schema={state.loadedSchema} />
      {tlbInputs}
    </TabPanel>
  )
}

export function TxBody(props: TxBodyProps) {
  const decoder_messages = useDecoderMessages(props.decodedMessages);

  return (
    <TabPanels>
      {decoder_messages.map(message => (
        <MessageBody onDeleteMessage={props.onDeleteMessage} onAddMessage={props.onAddMessage} message={message} key={message._id} />
      ))}
    </TabPanels>

  );
}
