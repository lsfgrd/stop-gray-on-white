import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ActionButton from './components/ActionButton';
import ColorCircle from './components/ColorCircle';
import { CHECKERED_GRADIENT, COLORS } from './config/constants';
import { getCurrentTab, reloadTab } from './helpers/chrome-helpers';

const Popup = () => {
  const [color, setColor] = useState<string>('rgb(0, 0, 0)');
  const [colorName, setColorName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<chrome.tabs.Tab>();

  useEffect(() => {
    const getTab = async () => {
      setTab(await getCurrentTab());
    };

    getTab();
  }, []);

  const submit = () => {
    if (tab?.id) {
      setIsLoading(true);
      chrome.tabs.sendMessage(
        tab.id,
        { color },
        () => {
          setIsLoading(false);
        },
      );
    }
  };

  return (
    <>
      <div>
        <h3>Choose a different text color:</h3>
      </div>
      {COLORS.map(({ hex, name, selected }) => (
        <ColorCircle
          key={hex}
          onClick={() => {
            setColor(hex);
            setColorName(name);
          }}
          hex={hex}
          name={name}
          defaultChecked={selected}
        />
      ))}
      <ColorCircle
        onClick={() => {
          setColor('');
          setColorName('custom');
        }}
        style={{ background: (colorName === 'custom' && color) || CHECKERED_GRADIENT }}
      />
      {colorName}
      {colorName === 'custom' ? (
        <input
          onChange={({ target }) => {
            setColor(target.value);
          }}
          placeholder="Custom color (HEX)"
          type="text"
        />
      ) : null}
      <ActionButton onClick={submit}>
        {isLoading ? 'Fixing ;)' : 'Fix website'}
      </ActionButton>
      <ActionButton onClick={reloadTab}>
        Reload
      </ActionButton>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
);
