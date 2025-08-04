"use client";
import React, { useEffect, useState } from 'react';
import WhatsAppChatButton from './WhatsAppChatButton';
import ChatbotWidget from './ChatbotWidget';

const FloatingChatWidgets: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will only run on the client, after the initial render.
    setIsClient(true);
    console.log('FloatingChatWidgets component rendered on client');
  }, []);

  // Only render the widgets on the client-side to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

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
