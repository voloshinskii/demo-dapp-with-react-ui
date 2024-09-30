import React from "react";
import { TxHeader } from "./TxHeader";
import {MessagesDecoder} from "../../transactions";
import { Tabs } from "@chakra-ui/react";
import { TxBody } from "./TxBody";

export interface TxPlaygroundProps {
  decoder: MessagesDecoder;
}

export function TxPlayground(props: TxPlaygroundProps) {
  return (
    <Tabs maxWidth={"1920px"} width={"100%"}>
      <TxHeader decodedMessages={props.decoder} />
      <TxBody onAddMessage={() => props.decoder.addMessage()} onDeleteMessage={(decoder) => props.decoder.removeMessage(decoder)} decodedMessages={props.decoder} />
    </Tabs>
  );
}
