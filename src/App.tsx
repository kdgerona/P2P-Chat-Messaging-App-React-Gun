import React, { useReducer, createContext } from 'react';
import Gun from 'gun';
import reducer from './reducer';
import { IInitialState, IContext } from './types';
// Components
import { Chat, Home } from './components';

const initialState: IInitialState = {
  messages: {},
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
      {state.username ? <Chat /> : <Home />}
    </AppContext.Provider>
  );
};

export default App;
