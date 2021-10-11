import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { CompactPicker } from 'react-color';

const Popup = () => {
  const [color, setColor] = useState<string>('rgb(0, 0, 0)');

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          color,
        });
      }
    });
  };

  return (
    <>
      <form onSubmit={changeBackground}>
        <div>
          <h3>Choose a different text color:</h3>
        </div>
        <CompactPicker
          color={color}
          onChangeComplete={(selectedColor) => {
            setColor(selectedColor.hex);
          }}
        />
        <button style={{ marginTop: '10px' }} type="submit" className="action-button">
          Fix website
        </button>
      </form>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
);
