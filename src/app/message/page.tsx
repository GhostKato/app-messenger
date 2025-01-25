import React from 'react';

const Message: React.FC = () => {
  return (
    <div className="bg-cool-gradient bg-[length:200%_200%] animate-gradient-move min-h-screen message-container flex justify-center items-center shadow-custom-inset">
      <h1 className="text-white text-6xl font-bold text-center p-8">
        Awesome Animated Gradient Background!
      </h1>
    </div>
  );
}

export default Message;
