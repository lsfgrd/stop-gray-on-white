import React from 'react';

export interface ColorCircleProps {
  name?: string;
  hex?: string;
  onClick: () => void;
  defaultChecked?: boolean;
  style?: React.CSSProperties | null;
}

const ColorCircle = ({
  name, hex, onClick, defaultChecked = false, style = null,
}: ColorCircleProps) => (
  <input
    className="color"
    aria-label={name}
    onClick={onClick}
    type="radio"
    name="color-picker"
    style={style || { backgroundColor: hex }}
    defaultChecked={defaultChecked}
  />
);

export default ColorCircle;
