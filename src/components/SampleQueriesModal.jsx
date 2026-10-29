import React from 'react';
import { X, Package, ShieldAlert, CreditCard, Headphones, Check, Sparkles, ExternalLink } from 'lucide-react';
import { MOCK_ORDERS } from '../data/mockData';

export default function SampleQueriesModal({ isOpen, onClose, onSelectPrompt }) {
  if (!isOpen) return null;

  const scenarios = [
    {
      category: '📦 Live Order Tracking',
      description: 'Test tracking statuses: In-Transit, Delivered, Processing, and Out-for-Delivery',
      queries: [
        { label: 'ORD-8492 (FedEx In-Transit)', text: 'Where is my order ORD-8492?' },
        { label: 'ORD-1024 (Delivered MacBook)', text: 'Can you track ORD-1024?' },
        { label: 'ORD-5501 (Warehouse Processing)', text: 'Track order ORD-5501' },
        { label: 'Multi-turn Flow (No ID prompt)', text: 'I want to track my package' },
      ],
    },
    {
      category: '🔄 Returns & Refund Guarantees',
      description: 'Test return policies, automated label generator & eligibility rules',
      queries: [
        { label: 'General Return Policy', text: 'How do I return an item and get a refund?' },
        { label: '30-Day Guarantee Details', text: 'What is your refund timeframe?' },
      ],
    },
    {
      category: '💳 Payments & Billing',
      description: 'Test credit card decline fixes, double charges & authorization holds',
      queries: [
        { label: 'Card Declined at Checkout', text: 'My credit card was declined, please help' },
        { label: 'Double Charge Inquiry', text: 'I was charged twice for one order' },
      ],
    },
    {
      category: '🎧 Human Specialist Escalation',
      description: 'Priority queue ticket generation with agent assignment',
      queries: [
        { label: 'Escalate to Real Agent', text: 'I want to speak with a human support agent' },
      ],
    },
  ];

  const handleSelect = (text) => {
    onSelectPrompt(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden text-left">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Supportly AI • Demo Guide & Mock Data</h3>
              <p className="text-xs text-slate-500">Click any sample scenario below to test the agent immediately</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Quick Mock Orders table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Available Mock Orders in Database:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.values(MOCK_ORDERS).map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => handleSelect(`Track order ${ord.id}`)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all cursor-pointer group flex items-start justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-blue-700 text-xs">{ord.id}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 line-clamp-1 font-medium">{ord.item}</p>
                    <p className="text-[11px] text-slate-400">{ord.carrier} • {ord.estDelivery}</p>
                  </div>
                  <span className="text-[11px] text-blue-600 font-semibold group-hover:underline shrink-0 ml-2">
                    Test →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Test Scenarios */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive Test Scenarios:
            </h4>
            {scenarios.map((sc, i) => (
              <div key={i} className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3">
                <h5 className="font-semibold text-slate-800 text-xs flex items-center justify-between">
                  <span>{sc.category}</span>
                </h5>
                <p className="text-[11px] text-slate-500 mb-2">{sc.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {sc.queries.map((q, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSelect(q.text)}
                      className="text-xs bg-white hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 text-slate-700 px-3 py-1.5 rounded-lg transition-colors shadow-2xs font-medium text-left"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Developer / LLM integration note */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900">
            <p className="font-semibold flex items-center gap-1 text-amber-800">
              💡 Student & Developer Note
            </p>
            <p className="text-amber-700 text-[11px] mt-0.5 leading-relaxed">
              This app is pre-configured with zero external dependencies so it runs instantly without requiring API keys or backend servers. The chat logic in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">src/services/agentEngine.js</code> is fully abstracted and ready for plugging in Gemini or OpenAI API calls.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded-xl transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}

