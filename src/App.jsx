import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import QuickActions from './components/QuickActions';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import SampleQueriesModal from './components/SampleQueriesModal';
import { generateAgentResponse } from './services/agentEngine';
import { playMessageSentSound, playMessageReceivedSound } from './utils/sound';

const INITIAL_MESSAGE = {
  id: 'welcome-msg',
  sender: 'bot',
  text: "Hi! I'm your AI support assistant. How can I help you today?\n\nYou can track packages, check refund policies, resolve payment issues, or speak with our live support team.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestions: [
    'Track my order',
    'How do I get a refund?',
    'Payment troubleshooting',
    'Talk to human support',
  ],
};

export default function App() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('supportly_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // Fallback
    }
    return [INITIAL_MESSAGE];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({});
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll when messages or typing changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Persist chat in session storage so refresh keeps history while tab remains open
  useEffect(() => {
    try {
      sessionStorage.setItem('supportly_chat_history', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text || !text.trim() || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (isSoundEnabled) {
      playMessageSentSound();
    }

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await generateAgentResponse(text, conversationContext);

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        cardType: response.cardType || null,
        orderData: response.orderData || null,
        refundData: response.refundData || null,
        escalationData: response.escalationData || null,
        suggestions: response.suggestions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      if (response.updatedContext) {
        setConversationContext((prev) => ({ ...prev, ...response.updatedContext }));
      }

      if (isSoundEnabled) {
        playMessageReceivedSound();
      }
    } catch (error) {
      const errorMsg = {
        id: `error-${Date.now()}`,
        sender: 'bot',
        text: "I apologize, but I encountered a momentary connection issue. Please try again or click 'Talk to Support' to reach our team.",
        suggestions: ['Retry query', 'Talk to Support'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    const freshWelcome = {
      ...INITIAL_MESSAGE,
      id: `welcome-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([freshWelcome]);
    setConversationContext({});
    try {
      sessionStorage.removeItem('supportly_chat_history');
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col justify-center items-center p-0 md:p-6 sm:p-4">
      {/* Outer App Shell */}
      <div className="w-full max-w-4xl h-[100dvh] md:h-[92vh] bg-white md:rounded-2xl shadow-xl md:shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <Header
          onClearChat={handleClearChat}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={() => setIsSoundEnabled(!isSoundEnabled)}
          onOpenSamples={() => setIsDemoModalOpen(true)}
          messageCount={messages.length}
        />

        {/* Scrollable Conversation Canvas */}
        <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 space-y-3 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30">
          {/* Quick Action cards shown prominently */}
          <QuickActions onSelectAction={handleSendMessage} />

          {/* Messages Stream */}
          <div className="pt-2">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onSelectSuggestion={handleSendMessage}
              />
            ))}

            {/* Active Typing Indicator */}
            {isTyping && <TypingIndicator />}

            {/* Auto-scroll anchor */}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Chat Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />

        {/* Sample Queries / Demo Guide Modal */}
        <SampleQueriesModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          onSelectPrompt={handleSendMessage}
        />
      </div>
    </div>
  );
}

