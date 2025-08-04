import React, { useEffect } from 'react';
import WhatsAppChatButton from './WhatsAppChatButton';
import ChatbotWidget from './ChatbotWidget';

const FloatingChatWidgets: React.FC = () => {
  useEffect(() => {
    console.log('FloatingChatWidgets component rendered');
  }, []);

  return (
    <>
      {/* WhatsApp Button - Bottom Right */}
      <WhatsAppChatButton />
      
      {/* Custom Chatbot - Bottom Left */}
      <ChatbotWidget />
    </>
  );
};

export default FloatingChatWidgets;
