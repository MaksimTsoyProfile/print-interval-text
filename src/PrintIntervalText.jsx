import React, { useEffect, useMemo, useState } from 'react';

const PrintIntervalText = () => {
  const [inputText, setInputText] = useState('');
  const [text, setText] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [index, setIndex] = useState(0);
  
  const messages = useMemo(() => text.split(' '),
    [text]);
  
  
  const handleInput = (event) => {
    setInputText(event.target.value);
  };
  
  const handleClear = () => {
    setInputText('');
    setIndex(0);
    setCurrentMessage('')
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClear();
    setText(inputText);
  }
  
  useEffect(() => {
    if (text !== '') {
      const interval = setInterval(() => {
        setCurrentMessage(prevMessage => {
          if (index === messages.length) return prevMessage;
          setIndex(index + 1);
          return prevMessage + ' ' + messages[index];
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [index, text, messages]);

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">
          <input
            type="text"
            onChange={handleInput}
            value={inputText}
            id="message"
          />
        </label>
        <button type="submit">Запуск</button>
      </form>
      <div>{currentMessage}</div>
    </div>
  );
}

export default PrintIntervalText;

// https://t.me/Makmiko