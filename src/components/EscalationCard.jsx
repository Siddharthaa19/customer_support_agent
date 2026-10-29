import React, { useState } from 'react';
import { Headphones, Clock, CheckCircle2, Copy, Check, MessageSquare, PhoneCall } from 'lucide-react';

export default function EscalationCard({ escalationData, onSelectAction }) {
  const [copied, setCopied] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [phone, setPhone] = useState('');

  const handleCopy = () => {
    navigator.clipboard?.writeText(escalationData.ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setCallbackRequested(true);
  };

  return (
    <div className="mt-3 bg-white border border-purple-200/90 rounded-xl p-4 shadow-sm text-left">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-purple-100 pb-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              SJ
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">{escalationData.agentName}</h4>
            <p className="text-xs text-purple-700 font-medium">{escalationData.agentRole}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            <Clock className="w-3 h-3 text-purple-600" /> Wait: {escalationData.waitTime}
          </span>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-xs text-slate-600 space-y-1.5 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Ticket Reference:</span>
          <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800">
            <span>{escalationData.ticketId}</span>
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-600 p-0.5 transition-colors"
              title="Copy Ticket ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Queue Position:</span>
          <span className="font-semibold text-emerald-600">#1 in queue • Priority Routing</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Live Status:</span>
          <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Agent reviewing chat history
          </span>
        </div>
      </div>

      {/* Option to request a phone callback */}
      {!callbackRequested ? (
        <form onSubmit={handleCallbackSubmit} className="space-y-2">
          <label className="text-[11px] font-medium text-slate-500 block">
            Prefer a phone call? Enter your number below:
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Me</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Callback requested for <strong>{phone}</strong>. Sarah will call you within 2 minutes!</span>
        </div>
      )}
    </div>
  );
}

