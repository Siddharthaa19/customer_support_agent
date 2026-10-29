import React, { useState } from 'react';
import { RotateCcw, ShieldCheck, Download, CheckCircle, FileText, ArrowRight } from 'lucide-react';

export default function RefundPolicyCard({ refundData }) {
  const [labelGenerated, setLabelGenerated] = useState(false);
  const [returnRMA, setReturnRMA] = useState(null);

  const handleGenerateLabel = () => {
    const rma = `RMA-${Math.floor(100000 + Math.random() * 900000)}`;
    setReturnRMA(rma);
    setLabelGenerated(true);
  };

  return (
    <div className="mt-3 bg-white border border-slate-200/90 rounded-xl p-4 shadow-sm text-left">
      {/* Policy Badge */}
      <div className="flex items-center gap-2.5 mb-3 border-b border-slate-100 pb-3">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">30-Day Money-Back Guarantee</h4>
          <p className="text-xs text-slate-500">Free prepaid return shipping for all eligible items</p>
        </div>
      </div>

      {/* 4 Step Procedure */}
      <div className="space-y-2 mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">How Returns Work:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {refundData.steps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
              <span className="inline-block w-4 h-4 text-center leading-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] mr-1.5">
                {idx + 1}
              </span>
              <span className="font-semibold text-slate-800">{step.title}</span>
              <p className="text-slate-500 mt-1 text-[11px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Condition checklist */}
      <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-2.5 text-xs text-emerald-900 mb-3 space-y-1">
        <p className="font-medium flex items-center gap-1.5 text-emerald-800">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Return Eligibility:
        </p>
        <ul className="list-disc list-inside text-[11px] text-emerald-700 space-y-0.5 ml-1">
          {refundData.conditions.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      {/* Interactive Label Generator Action */}
      {!labelGenerated ? (
        <button
          onClick={handleGenerateLabel}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Generate Free Return Shipping Label</span>
        </button>
      ) : (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-2 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-900">Return Label Ready!</span>
            <span className="font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[11px]">
              {returnRMA}
            </span>
          </div>
          <p className="text-blue-700 text-[11px]">
            Prepaid FedEx Return Label created. Attach to your package and drop off at any FedEx kiosk.
          </p>
          <div className="flex gap-2">
            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                alert(`Simulated Download: Return Label ${returnRMA}.pdf (Prepaid Shipping Label ready)`);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white text-blue-700 border border-blue-200 rounded font-medium hover:bg-blue-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download Label (PDF)
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

