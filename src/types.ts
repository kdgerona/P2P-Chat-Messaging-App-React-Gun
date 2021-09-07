import { Dispatch } from 'react';
import Gun from 'gun';

export interface IContext {
  state?: IInitialState;
  dispatch?: Dispatch<TActions>;
  gun?: typeof Gun.chain;
}

export interface IInitialState {
  messages: Record<string, IMessage>;
  username?: string;
}

export interface IMessage {
  id: string;
  name: string;
  message: string;
  created_date: string;
}

// Actions
export type TActions = ISetMessageAction | ISetUsernameAction;

export interface ISetMessageAction {
  type: 'SET_MESSAGE';
  payload: IMessage;
}

export interface ISetUsernameAction {
  type: 'SET_USERNAME';
  payload: string;
}
