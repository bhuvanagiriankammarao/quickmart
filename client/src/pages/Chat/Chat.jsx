import React, { useState } from 'react';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
        onClick={toggleChat}
      >
        💬
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-72 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          <button
            className="text-gray-500 text-xl p-2 self-end hover:text-gray-700"
            onClick={toggleChat}
          >
            ✖
          </button>
          <div className="p-4 overflow-y-auto flex-1">
            <p>Welcome to Chat Support!</p>
            {/* Add more chat content here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSupport;
