import { TxMessage } from "../interfaces/TxMessage";
import {Builder, Cell} from "@ton/core";
import { getTLBDecoder } from "./decoders";
import { v4 as uuidv4 } from 'uuid';
import {useEffect, useState} from "react";
import BigNumber from "bignumber.js";
import {mappedSchemas} from "./schemas";
import {FulfilledOpenContractInternal} from "../tlb/tlb-codegen/main";

type MessageDecoderSubscriber = (payload: string | undefined, loadedSchema: FulfilledOpenContractInternal | undefined, receiver: string, amount: string) => void;

export class MessageDecoder {
  public _id = uuidv4();
  public receiver: string;
  public init?: string;
  public amount: string;
  public loadedSchema: FulfilledOpenContractInternal | undefined;

  private payloadFromBuffer: string | undefined;

  private subscribers = new Set<MessageDecoderSubscriber>();

  public subscribe = (subscriber: MessageDecoderSubscriber) => {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  public updateReceiver(newReceiver: string) {
    this.receiver = newReceiver;
    this.emit();
  }

  public updateAmount(newAmount: string) {
    this.amount = newAmount;
    this.emit();
  }

  public updateInit(newInit: string) {
    this.init = newInit;
    this.emit();
  }

  public updatePayload(newPayload: string) {
    this.decodePayload(newPayload);
  }

  private _fieldValues: {[key: string]: any} = {};

  public getFieldValue(fieldId: string) {
    return this._fieldValues[fieldId];
  }

  get boc(): undefined | Buffer {
    if (!this.loadedSchema) {
      return undefined;
    }
    const binary = new BigNumber(this.loadedSchema.binary, 16).toNumber();

    return this.loadedSchema.fields.reduce((acc, curr) => {
      return getTLBDecoder(curr.fieldType).encodeValue(acc, this._fieldValues[curr.name]);
    }, new Builder().storeUint(binary, 32)).endCell().toBoc();
  }

  get payload(): undefined | string {
    try {
      const boc = this.boc;
      if (!boc) {
        return this.payloadFromBuffer;
      }
      return boc.toString('base64');
    } catch (e) {
    }
  }

  public updateFieldValue(tlbName: string, updatedValue: any) {
    this._fieldValues[tlbName] = updatedValue;
    this.emit();
  }

  constructor(public message: TxMessage) {
    this.receiver = message.address;
    this.amount = message.amount;
    if (message.payload === undefined) {
      return;
    }
    this.decodePayload(message.payload);
  }

  private emit() {
    this.subscribers.forEach((subscriber) => subscriber(this.payload, this.loadedSchema, this.receiver, this.amount));
  }

  private decodePayload(payload: string) {
    try {
      this.payloadFromBuffer = payload;
      if (!payload) {
        this.loadedSchema = undefined;
        this.emit();
        return;
      }
      const slice = Cell.fromBase64(payload).beginParse();
      const opCode = slice.loadUint(32);
      this.loadedSchema = mappedSchemas.flatMap(schema => schema.internals).filter(internal => internal !== undefined).find(internal => new BigNumber((internal as FulfilledOpenContractInternal).binary).isEqualTo(opCode));
      if (this.loadedSchema) {
        this.loadedSchema.fields.reduce((accSlice, currPart) => {
          this._fieldValues[currPart.name] = getTLBDecoder(currPart.fieldType).decodeValue(accSlice);
          return accSlice;
        }, slice);
        this.payloadFromBuffer = undefined;
      }
      this.emit();
    } catch (e) {
        console.log('failed to decode', e);
        this.loadedSchema = undefined;
    }
  }
}

export function useMessageDecoderState(decoder: MessageDecoder) {
  const [state, setState] = useState({ payload: decoder.payload, loadedSchema: decoder.loadedSchema, receiver: decoder.receiver, amount: decoder.amount });
  useEffect(() => {
    const unsubscribe = decoder.subscribe((payload, loadedSchema, receiver, amount) => setState({ payload, loadedSchema, receiver, amount }));
    return () => {
      unsubscribe();
    }
  }, [decoder._id]);
  return state;
}

export


type MessagesDecoderSubscriber = (decoded_messages: MessageDecoder[]) => void;

export class MessagesDecoder {
  public decoded_messages = new Set<MessageDecoder>();

  private subscribers = new Set<MessagesDecoderSubscriber>();

  public subscribe = (subscriber: MessagesDecoderSubscriber) => {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  private emit() {
    this.subscribers.forEach((subscriber) => subscriber(Array.from(this.decoded_messages)));
  }

  constructor(public messages: TxMessage[]) {
    messages.forEach(mess => this.decoded_messages.add(new MessageDecoder(mess)));
  }

  public addMessage() {
    this.decoded_messages.add(new MessageDecoder({ amount: '50000000', address: 'UQD2NmD_lH5f5u1Kj3KfGyTvhZSX0Eg6qp2a5IQUKXxOGzCi' }))
    this.emit();
  }

  public removeMessage(decoder: MessageDecoder) {
    this.decoded_messages.delete(decoder);
    this.emit();
  }

  public getTonconnectMessages(): TxMessage[] {
    return Array.from(this.decoded_messages).map((decoded) => ({
      address: decoded.receiver,
      amount: decoded.amount,
      payload: decoded.payload,
      init: decoded.init,
    }))
  }

  public encodeMessagesJSONToBase64() {
    return btoa(JSON.stringify(this.getTonconnectMessages()));
  }

  public static initFromBase64(base64EncodedJSON: string) {
    const messages = JSON.parse(atob(base64EncodedJSON));
    return new MessagesDecoder(messages);
  }
}

export function useDecoderMessages(decoder: MessagesDecoder) {
  const [messages, setMessages] = useState<MessageDecoder[]>(Array.from(decoder.decoded_messages));
  useEffect(() => {
    const unsubscribe = decoder.subscribe((decoded_messages) => setMessages(decoded_messages));
    return () => {
      unsubscribe();
    }
  }, [decoder]);
  return messages;
}

export function useDecoderEncodedState(decoder: MessagesDecoder) {
  const messages = useDecoderMessages(decoder);
  const [encodedState, setEncodedState] = useState<string>(decoder.encodeMessagesJSONToBase64());

  useEffect(() => {
    const unsubscribers = messages.map(message => {
      setEncodedState(decoder.encodeMessagesJSONToBase64());
      return message.subscribe(() => setEncodedState(decoder.encodeMessagesJSONToBase64()))
    });
    return () => {
      unsubscribers.map(unsubscribe => unsubscribe());
    }
  }, [messages]);

  return encodedState;
}
