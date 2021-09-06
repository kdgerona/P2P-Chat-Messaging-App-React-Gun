import { Dispatch } from 'react';
import Gun from 'gun';

export interface IContext {
  state?: IInitialState;
  dispatch?: Dispatch<TActions>;
  gun?: typeof Gun.chain;
}

export interface IInitialState {
  messages: IMessage[];
}

export type TActions = ISetMessageAction;

export interface ISetMessageAction {
  type: 'SET_MESSAGE';
  payload: IMessage;
}

export interface IMessage {
  name: string;
  message: string;
  created_date: string;
}
