import React from 'react';
import Draggable from 'react-draggable';

interface FloatingWindowProps {
  children: React.ReactNode;
  onClose: () => void;
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({ children, onClose }) => {
  return (
    <Draggable>
      <div className="fixed bottom-10 right-10 z-50">
        <button onClick={onClose} className="absolute top-2 right-2">X</button>
        {children}
      </div>
    </Draggable>
  );
};

export default FloatingWindow;