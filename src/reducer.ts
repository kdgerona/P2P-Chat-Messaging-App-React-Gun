import React from 'react';
import { IInitialState, TActions } from './types';

/**
 * Since we only have one reducer,
 * will update this as this mini-project grows.
 */

const reducer: React.Reducer<IInitialState, TActions> = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
