import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Options = () => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    chrome.storage.sync.get(
      {
        favoriteColor: '#000',
      },
      (items) => {
        setColor(items.favoriteColor);
      },
    );
  }, []);

  // const saveOptions = () => {
  //   chrome.storage.sync.set(
  //     {
  //       favoriteColor: color,
  //     },
  //   );
  // };

  return (
    <>
      <div>
        { color }
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById('root'),
);
