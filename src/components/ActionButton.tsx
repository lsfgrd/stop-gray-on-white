import React from 'react';

export interface ActionButtonProps {
  children: React.ReactChild;
  onClick?: () => void;
}

const ActionButton = ({ children, onClick, ...props }: ActionButtonProps) => (
  <button
    onClick={onClick}
    style={{ marginTop: '10px' }}
    type="button"
    className="action-button"
    {...props}
  >
    {children}
  </button>
);

export default ActionButton;
