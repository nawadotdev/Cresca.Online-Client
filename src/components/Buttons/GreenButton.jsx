import React from 'react'

// green button component

const GreenButton = ({ children, onClick }) => {
  return (
    <button className="px-4 py-1 bg-gradient-to-l rounded-lg from-primary/20 to-primary/80 transition hover:from-primary/40 hover:to-primary/90" onClick={onClick}>
      {children}
    </button>
  );
};

export default GreenButton;
