import React from "react";
import { Tab, TabList } from "@chakra-ui/react";
import {MessageDecoder, MessagesDecoder, useDecoderMessages, useMessageDecoderState} from "../../transactions";

export interface TxHeaderProps {
  decodedMessages: MessagesDecoder;
}

export function TxTab(props: { message: MessageDecoder }) {
  const decoderState = useMessageDecoderState(props.message);
  return (
    <Tab>{decoderState.loadedSchema ? decoderState.loadedSchema.name : decoderState.payload ? 'Transfer with unknown payload' : 'Transfer without payload'}</Tab>
  )
}

export function TxHeader(props: TxHeaderProps) {
  const decoded_messages = useDecoderMessages(props.decodedMessages);

  return (
    <>
      <TabList my={4}>
        {decoded_messages.map(message => (
          <TxTab key={message._id} message={message} />
        ))}
      </TabList>
    </>
  );
}
