import React, { useReducer, createContext } from 'react';
import Gun from 'gun';
import reducer from './reducer';
import { IInitialState, IContext } from './types';
// Components
import Chat from './components/chat';

const initialState: IInitialState = {
  messages: [],
};

const gun = Gun({
  peers: ['http://localhost:8000/gun'],
});

export const AppContext = createContext<IContext>({});

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        gun,
      }}
    >
      <Chat />
    </AppContext.Provider>
  );
};

export default App;
