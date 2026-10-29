import React, { useState } from 'react';
import { Bot, Sparkles, Trash2, Volume2, VolumeX, HelpCircle, RefreshCw } from 'lucide-react';

export default function Header({
  onClearChat,
  isSoundEnabled,
  onToggleSound,
  onOpenSamples,
  messageCount,
}) {
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const confirmAndClear = () => {
    onClearChat();
    setShowConfirmClear(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
      {/* Bot info & status */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100">
            <Bot className="w-5 h-5" />
          </div>
          {/* Animated online status dot */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-slate-900 text-base tracking-tight">Supportly AI</h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
              <Sparkles className="w-2.5 h-2.5 text-blue-600" /> 24/7 Agent
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Online</span>
            <span>•</span>
            <span className="text-slate-400 hidden xs:inline">Avg. reply time &lt; 5s</span>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1.5">
        {/* Sample Orders & Quick Demo Helper */}
        <button
          onClick={onOpenSamples}
          title="View Sample Orders & Demo Prompts"
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
        >
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span className="hidden md:inline">Demo Guide</span>
        </button>

        {/* Audio Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={isSoundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          className={`p-2 rounded-lg transition-colors ${
            isSoundEnabled
              ? 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
          }`}
        >
          {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Clear Chat with popup confirmation */}
        <div className="relative">
          <button
            onClick={() => setShowConfirmClear(true)}
            title="Reset & Clear Conversation"
            disabled={messageCount <= 1}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {showConfirmClear && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-30 animate-fade-in text-left">
              <p className="text-xs font-semibold text-slate-800">Clear chat history?</p>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                This will reset the conversation and clear all message bubbles.
              </p>
              <div className="flex items-center justify-end gap-2 mt-3">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAndClear}
                  className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded shadow-xs"
                >
                  Clear Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

