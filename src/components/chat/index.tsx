import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../../App';
import { IMessage } from './types';
import styled from 'styled-components';

const Chat: React.FC = () => {
  const { gun, state, dispatch } = useContext(AppContext);
  const [messageInput, setMessageInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * ! This can be solve, thru smaller lines of code.
     * ! but the issue is for removing specific listener.
     * ! It does have a solution but it's awkward to get hold of.
     */
    const messages = gun!.get('messages');

    messages.map().once((data) => {
      dispatch!({
        type: 'SET_MESSAGE',
        payload: data as IMessage,
      });
    });

    messages.on((data) => {
      dispatch!({
        type: 'SET_MESSAGE',
        payload: data as IMessage,
      });
    });

    return () => messages?.off();
  }, []);

  useEffect(() => {
    if (!messageEndRef) return;
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state?.messages, state?.messages.length]);

  const messageInputHandler = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setMessageInput(event.currentTarget.value);
  };

  const sendMessageHandler = (
    event: React.SyntheticEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    const messages = gun?.get('messages');
    messages?.set({
      name: 'Kevin',
      message: messageInput,
      created_date: new Date().toISOString(),
    });

    setMessageInput('');
  };

  return (
    <StyledChatContainer>
      <div className='container'>
        <h1>Direct P2P Messaging</h1>
        <div
          className={`${
            state?.messages.length ? '' : 'empty-'
          }chat-window-container`}
        >
          {state?.messages.length ? (
            state?.messages.map((message) => {
              return (
                <div key={message.created_date}>
                  <h3>{message.name}</h3>
                  <p>{message.message}</p>
                  <p>{message.created_date}</p>
                </div>
              );
            })
          ) : (
            <h3>No messages yet</h3>
          )}
          <div ref={messageEndRef}></div>
        </div>
        <form className='form' onSubmit={sendMessageHandler}>
          <input
            className='message-input'
            name='message'
            value={messageInput}
            onChange={messageInputHandler}
            placeholder='Chat Message'
          />
          <button onClick={sendMessageHandler}>Send</button>
        </form>
      </div>
    </StyledChatContainer>
  );
};

export default Chat;

const StyledChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 0 20% 0 20%;

  .container {
    display: flex;
    flex-direction: column;
    height: 80%;
  }

  .chat-window-container {
    border: 1px solid black;
    border-bottom: none;
    height: 100%;
    overflow-y: scroll;
    padding: 0 1% 1% 1%;
  }

  .empty-chat-window-container {
    border: 1px solid black;
    border-bottom: none;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form {
    display: flex;
    justify-content: center;
    height: 5%;

    .message-input {
      width: 100%;
    }
  }
`;
