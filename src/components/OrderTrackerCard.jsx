import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, Clock, MapPin, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function OrderTrackerCard({ order }) {
  const [copied, setCopied] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'shipped':
      case 'in-transit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'out for delivery':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="mt-3 bg-white border border-slate-200/90 rounded-xl p-4 shadow-sm text-left hover:shadow-md transition-shadow">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 text-sm">{order.id}</span>
              <button
                onClick={handleCopy}
                title="Copy Order ID"
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-slate-500">Ordered {order.date}</p>
          </div>
        </div>

        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* Item info */}
      <div className="py-3 text-sm">
        <p className="font-medium text-slate-800">{order.item}</p>
        <p className="text-xs text-slate-500 mt-0.5">Total: <span className="font-semibold text-slate-700">{order.amount}</span></p>
      </div>

      {/* Step Progress Bar */}
      <div className="py-2">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-2">
          <span className={order.progressStep >= 1 ? 'text-blue-600 font-semibold' : ''}>Placed</span>
          <span className={order.progressStep >= 2 ? 'text-blue-600 font-semibold' : ''}>Processing</span>
          <span className={order.progressStep >= 3 ? 'text-blue-600 font-semibold' : ''}>Shipped</span>
          <span className={order.progressStep >= 4 ? 'text-emerald-600 font-semibold' : ''}>Delivered</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              order.progressStep >= 4 ? 'bg-emerald-500' : 'bg-blue-600'
            }`}
            style={{ width: `${(order.progressStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Courier & Delivery Meta */}
      <div className="mt-3 bg-slate-50/80 rounded-lg p-2.5 text-xs text-slate-600 space-y-1.5 border border-slate-100">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Truck className="w-3.5 h-3.5 text-blue-600" /> Carrier:
          </span>
          <span className="font-medium text-slate-800">{order.carrier}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-blue-600" /> Delivery:
          </span>
          <span className="font-medium text-blue-700">{order.estDelivery}</span>
        </div>
        {order.signedBy && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Receipt:
            </span>
            <span className="font-medium text-emerald-700">{order.signedBy}</span>
          </div>
        )}
        <div className="flex items-start gap-1.5 pt-1 border-t border-slate-200/60 text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
          <span className="truncate">{order.deliveryAddress}</span>
        </div>
      </div>

      {/* Collapsible Timeline Toggle */}
      {order.timeline && (
        <div className="mt-3 pt-2 border-t border-slate-100">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="flex items-center justify-between w-full text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>{showTimeline ? 'Hide Tracking History' : 'View Full Tracking History'}</span>
            {showTimeline ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showTimeline && (
            <div className="mt-3 space-y-2.5 border-l-2 border-blue-200 ml-2 pl-3 py-1">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative text-xs">
                  <div
                    className={`absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
                      event.done ? (event.current ? 'bg-blue-600 ring-2 ring-blue-100' : 'bg-emerald-500') : 'bg-slate-300'
                    }`}
                  />
                  <div className="flex items-baseline justify-between">
                    <span className={`font-medium ${event.done ? 'text-slate-800' : 'text-slate-400'}`}>
                      {event.step}
                    </span>
                    <span className="text-[10px] text-slate-400">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

