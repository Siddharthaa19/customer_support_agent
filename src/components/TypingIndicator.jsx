import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4 items-start animate-fade-in">
      <div className="shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100">
          <Bot className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
          <span className="font-medium text-slate-600">Supportly AI</span>
          <span>•</span>
          <span className="text-blue-600 font-medium">thinking...</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-sm p-3.5 shadow-sm inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
          <span className="ml-1 text-xs text-slate-400 font-medium">Supportly is typing...</span>
        </div>
      </div>
    </div>
  );
}

