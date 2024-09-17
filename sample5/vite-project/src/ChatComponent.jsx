
import React, { useState, useRef, useEffect } from 'react';
import './ChatComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [reactions, setReactions] = useState({});
  const [activeReactions, setActiveReactions] = useState({});
  const [isFetching, setIsFetching] = useState(false); // Add a state to manage form activation
  const messagesEndRef = useRef(null); // Ref to the end of messages container

  // Initialize AWS Lambda client
  const lambdaClient = new LambdaClient({
    region: 'us-east-1', // Replace with your AWS region
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: 'us-east-1' }, // Replace with your AWS region
      identityPoolId: 'us-east-1:54d9750c-c207-4a7e-bf7c-999fb93ff29d' // Replace with your Cognito Identity Pool ID
    })
  });

  const invokeLambda = async (query) => {
    const params = {
      FunctionName: 'LLMchat', // Replace with your Lambda function name
      Payload: JSON.stringify({ query }) // Send the user's message as payload
    };

    try {
      const command = new InvokeCommand(params);
      const response = await lambdaClient.send(command);
      const result = JSON.parse(new TextDecoder().decode(response.Payload));
      return result;
    } catch (error) {
      console.error('Error invoking Lambda function:', error);
      return { response: 'Please try after some time.... ' }; // Return an error message if invocation fails
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const userMessage = { id: messages.length + 2, text: inputValue, type: 'person' };
      setMessages([...messages, userMessage]);
      setIsFetching(true); // Disable the form

      // Add a loading message placeholder
      const loadingMessage = { id: messages.length + 1, text: 'generating responce.....', type: 'loading' }; //loading message has to add here
      setMessages(prevMessages => [...prevMessages, loadingMessage]);

      // Invoke Lambda function
      const lambdaResponse = await invokeLambda(inputValue);
      const botMessage = { id: messages.length + 2, text: lambdaResponse.response, type: 'ai' };

      // Replace the loading message with the actual response
      setMessages(prevMessages => prevMessages.map(message =>
        message.id === loadingMessage.id ? botMessage : message
      ));

      setInputValue('');
      setIsFetching(false); // Enable the form
    }
  };

  const handleReaction = (messageId, reactionType) => {
    setReactions(prevReactions => ({
      ...prevReactions,
      [messageId]: {
        ...prevReactions[messageId],
        [reactionType]: (prevReactions[messageId]?.[reactionType] || 0) + 1
      }
    }));
    setActiveReactions(prevActiveReactions => ({
      ...prevActiveReactions,
      [messageId]: {
        [reactionType]: !prevActiveReactions[messageId]?.[reactionType]
      }
    }));
  };

  // Effect to scroll to the bottom of messages container when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.type === 'person'
                ? 'messageContainer-person'
                : message.type === 'ai'
                ? 'messageContainer-ai'
                : 'messageContainer-loading' // Class for loading message
            }
          >
            <p className={message.type === 'person' ? 'person' : message.type === 'ai' ? 'ai' : 'loading'}>
              {message.text}
            </p>
            {message.type === 'ai' && (
              <div className="icons">
                <span
                  className={`icon-container ${activeReactions[message.id]?.like ? 'active-like' : ''}`}
                  onClick={() => handleReaction(message.id, 'like')}
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="icon" />
                </span>
                <span
                  className={`icon-container ${activeReactions[message.id]?.dislike ? 'active-dislike' : ''}`}
                  onClick={() => handleReaction(message.id, 'dislike')}
                >
                  <FontAwesomeIcon icon={faThumbsDown} className="icon" />
                </span>
              </div>
            )}
          </div>
        ))}
        {/* Empty div used as ref to scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="input-field"
          disabled={isFetching} // Disable the input field when fetching
        />
        <button type="submit" className="button" disabled={isFetching}>
          <FontAwesomeIcon icon={faArrowRight} className="icon" /> {/* Add arrow icon here */}
        </button> {/* Disable the button when fetching */}
      </form>
    </div>
  );
};

export default ChatComponent;
