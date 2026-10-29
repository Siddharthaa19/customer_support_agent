import React, { useState } from 'react';
import { CreditCard, AlertCircle, CheckCircle, ShieldAlert, RefreshCw } from 'lucide-react';

export default function PaymentHelpCard() {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (key) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checklist = [
    { id: 'address', label: 'Billing ZIP / Postal code matches bank records' },
    { id: 'otp', label: '3D Secure SMS or Banking App approval accepted' },
    { id: 'limits', label: 'Daily online transaction limits not exceeded' },
    { id: 'intl', label: 'International transactions allowed on card' },
  ];

  return (
    <div className="mt-3 bg-white border border-slate-200/90 rounded-xl p-4 shadow-sm text-left">
      <div className="flex items-center gap-2.5 mb-3 border-b border-slate-100 pb-3">
        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
          <CreditCard className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">Payment Troubleshooting Checklist</h4>
          <p className="text-xs text-slate-500">Quick fixes for 95% of checkout failures</p>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Verification Steps:</p>
        <div className="space-y-1.5">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-center gap-2.5 w-full p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-xs text-slate-700 transition-colors text-left"
            >
              <div
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  checkedItems[item.id]
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {checkedItems[item.id] && <CheckCircle className="w-3.5 h-3.5" />}
              </div>
              <span className={checkedItems[item.id] ? 'line-through text-slate-400' : 'text-slate-700'}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-2.5 text-xs text-blue-900">
        <span className="font-semibold block mb-0.5">Still seeing a charge on your statement?</span>
        <p className="text-[11px] text-blue-700 leading-relaxed">
          Pending authorization holds typically drop off within 24 to 48 hours depending on your bank. No money will leave your account for unfulfilled orders.
        </p>
      </div>
    </div>
  );
}

