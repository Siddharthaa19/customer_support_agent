import React, { useState } from 'react';
import { Bot, User, ThumbsUp, ThumbsDown, Copy, Check, Sparkles } from 'lucide-react';
import OrderTrackerCard from './OrderTrackerCard';
import RefundPolicyCard from './RefundPolicyCard';
import PaymentHelpCard from './PaymentHelpCard';
import EscalationCard from './EscalationCard';

export default function ChatMessage({ message, onSelectSuggestion }) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'helpful' | 'not_helpful' | null
  const isBot = message.sender === 'bot';

  const handleCopy = () => {
    navigator.clipboard?.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render markdown-like formatting (bolding and lines)
  const renderFormattedText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      // Bold text handling
      const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
      return (
        <p key={idx} className={line.trim() === '' ? 'h-2' : 'leading-relaxed'}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code
                  key={pIdx}
                  className="bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded text-[12px] font-mono font-medium border border-slate-200/60"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className={`flex gap-3 mb-4 transition-all duration-200 ${isBot ? 'items-start' : 'items-end flex-row-reverse'}`}>
      {/* Avatar */}
      <div className="shrink-0">
        {isBot ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100">
            <Bot className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-xs shadow-sm">
            <User className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Message Content Container */}
      <div className={`max-w-[85%] md:max-w-[75%] ${isBot ? 'text-left' : 'text-right'}`}>
        {/* Name & Time */}
        <div className={`flex items-center gap-1.5 text-[11px] text-slate-400 mb-1 ${isBot ? 'justify-start' : 'justify-end'}`}>
          <span className="font-medium text-slate-600">{isBot ? 'Supportly AI' : 'You'}</span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        {/* Bubble */}
        <div
          className={`p-3.5 text-sm rounded-2xl shadow-sm ${
            isBot
              ? 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-sm'
              : 'bg-blue-600 text-white rounded-tr-sm text-left font-normal leading-relaxed'
          }`}
        >
          {isBot ? (
            <div className="text-slate-700 space-y-1">
              {renderFormattedText(message.text)}
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}

          {/* Rich Widget Cards for Bot */}
          {isBot && message.cardType === 'order' && message.orderData && (
            <OrderTrackerCard order={message.orderData} />
          )}

          {isBot && message.cardType === 'refund' && message.refundData && (
            <RefundPolicyCard refundData={message.refundData} />
          )}

          {isBot && message.cardType === 'payment_help' && (
            <PaymentHelpCard />
          )}

          {isBot && message.cardType === 'escalation' && message.escalationData && (
            <EscalationCard
              escalationData={message.escalationData}
              onSelectAction={onSelectSuggestion}
            />
          )}
        </div>

        {/* Bot Message Footer Actions (Copy, Thumbs Feedback) */}
        {isBot && (
          <div className="flex items-center gap-2 mt-1.5 px-1 text-[11px] text-slate-400">
            <button
              onClick={handleCopy}
              className="hover:text-slate-600 flex items-center gap-1 transition-colors"
              title="Copy message"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <span>•</span>

            <span className="text-slate-400">Was this helpful?</span>
            <button
              onClick={() => setFeedback(feedback === 'helpful' ? null : 'helpful')}
              className={`p-1 rounded transition-colors ${
                feedback === 'helpful' ? 'text-emerald-600 bg-emerald-50' : 'hover:text-slate-600'
              }`}
              title="Helpful"
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => setFeedback(feedback === 'not_helpful' ? null : 'not_helpful')}
              className={`p-1 rounded transition-colors ${
                feedback === 'not_helpful' ? 'text-rose-600 bg-rose-50' : 'hover:text-slate-600'
              }`}
              title="Not helpful"
            >
              <ThumbsDown className="w-3 h-3" />
            </button>
            {feedback && (
              <span className="text-[10px] text-emerald-600 font-medium animate-fade-in">
                Thanks for your feedback!
              </span>
            )}
          </div>
        )}

        {/* Contextual Suggestions Chips */}
        {isBot && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {message.suggestions.map((suggestion, sIdx) => (
              <button
                key={sIdx}
                onClick={() => onSelectSuggestion && onSelectSuggestion(suggestion)}
                className="text-xs font-medium bg-blue-50/80 hover:bg-blue-100/80 text-blue-700 border border-blue-200/80 px-2.5 py-1 rounded-full transition-all duration-150 hover:shadow-xs active:scale-95 flex items-center gap-1 text-left"
              >
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

