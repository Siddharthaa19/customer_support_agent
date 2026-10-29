import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Sparkles, X, Image as ImageIcon } from 'lucide-react';
import { DEMO_PROMPTS } from '../data/mockData';

export default function ChatInput({ onSendMessage, isTyping }) {
  const [inputText, setInputText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const textareaRef = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if ((!inputText.trim() && !attachment) || isTyping) return;

    let fullMessage = inputText.trim();
    if (attachment) {
      fullMessage = fullMessage ? `${fullMessage} [Attached: ${attachment.name}]` : `[Attached: ${attachment.name}]`;
    }

    onSendMessage(fullMessage);
    setInputText('');
    setAttachment(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSimulateAttachment = () => {
    const sampleFiles = [
      'Order_Receipt_ORD8492.pdf',
      'Damaged_Package_Photo.jpg',
      'Bank_Statement_Charge.png',
    ];
    const randomFile = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
    setAttachment({ name: randomFile });
  };

  return (
    <div className="bg-white border-t border-slate-200/90 p-3 sm:p-4 sticky bottom-0 z-10">
      {/* Demo Quick Prompts Chips Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-1 text-left">
        <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-blue-500" /> Suggestions:
        </span>
        {DEMO_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(p.query)}
            disabled={isTyping}
            className="text-[11px] font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Simulated Attachment Pill if attached */}
      {attachment && (
        <div className="flex items-center gap-2 mb-2 p-1.5 px-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 w-fit animate-fade-in">
          <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-medium truncate max-w-[200px]">{attachment.name}</span>
          <button
            onClick={() => setAttachment(null)}
            className="hover:text-blue-950 p-0.5"
            title="Remove attachment"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 bg-slate-50 border border-slate-300/80 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 rounded-2xl p-1.5 sm:p-2 transition-all shadow-inner"
      >
        {/* Attachment Button */}
        <button
          type="button"
          onClick={handleSimulateAttachment}
          title="Attach receipt or photo (simulation)"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors shrink-0"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isTyping ? 'Supportly AI is formulating a reply...' : 'Type your question or order number (e.g. ORD-8492)...'}
          disabled={isTyping}
          className="flex-1 max-h-28 bg-transparent text-sm text-slate-800 placeholder-slate-400 resize-none outline-none py-1.5 px-1 leading-relaxed disabled:opacity-50"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={(!inputText.trim() && !attachment) || isTyping}
          className={`p-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center shrink-0 ${
            (inputText.trim() || attachment) && !isTyping
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
          title="Send message (Enter)"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Small Footer Notice */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          AI-powered customer support
        </span>
        <span className="hidden sm:inline">Press <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200 text-[10px]">Enter</kbd> to send, <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200 text-[10px]">Shift+Enter</kbd> for newline</span>
      </div>
    </div>
  );
}

