import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';

const Home: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const [username, setUsername] = useState('');

  const usernameInputHandler = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setUsername(event.currentTarget.value);
  };

  const startChatHandler = () => {
    dispatch!({
      type: 'SET_USERNAME',
      payload: username,
    });
  };

  return (
    <div>
      <h1>What do you like to be called?</h1>
      <input
        name='username'
        onChange={usernameInputHandler}
        value={username}
        placeholder='Enter username'
      />
      <button onClick={startChatHandler}>Start Chatting!</button>
    </div>
  );
};

export default Home;
