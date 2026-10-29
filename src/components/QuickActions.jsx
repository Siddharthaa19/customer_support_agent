import React from 'react';
import { Package, RotateCcw, CreditCard, Headphones, ChevronRight } from 'lucide-react';
import { QUICK_ACTIONS } from '../data/mockData';

const ICONS = {
  Package,
  RotateCcw,
  CreditCard,
  Headphones,
};

export default function QuickActions({ onSelectAction }) {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50/70 group-hover:bg-blue-100/70',
          text: 'text-blue-600',
          border: 'border-blue-100 hover:border-blue-300',
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50/70 group-hover:bg-emerald-100/70',
          text: 'text-emerald-600',
          border: 'border-emerald-100 hover:border-emerald-300',
        };
      case 'amber':
        return {
          bg: 'bg-amber-50/70 group-hover:bg-amber-100/70',
          text: 'text-amber-600',
          border: 'border-amber-100 hover:border-amber-300',
        };
      case 'purple':
        return {
          bg: 'bg-purple-50/70 group-hover:bg-purple-100/70',
          text: 'text-purple-600',
          border: 'border-purple-100 hover:border-purple-300',
        };
      default:
        return {
          bg: 'bg-slate-50 group-hover:bg-slate-100',
          text: 'text-slate-600',
          border: 'border-slate-100 hover:border-slate-300',
        };
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Quick Assistance
        </span>
        <span className="text-[11px] text-slate-400">Click to start</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {QUICK_ACTIONS.map((action) => {
          const IconComponent = ICONS[action.icon] || Package;
          const colors = getColorClasses(action.color);

          return (
            <button
              key={action.id}
              onClick={() => onSelectAction(action.prompt)}
              className={`group flex flex-col justify-between p-3 rounded-xl bg-white border ${colors.border} shadow-xs hover:shadow-md transition-all duration-200 text-left active:scale-[0.98]`}
            >
              <div>
                <div className={`w-8 h-8 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center mb-2.5 transition-colors`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-800 text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 leading-snug">
                  {action.description}
                </p>
              </div>

              <div className="flex items-center justify-end mt-2 pt-1 border-t border-slate-50">
                <span className="text-[10px] text-slate-400 font-medium group-hover:text-blue-600 flex items-center gap-0.5 transition-colors">
                  Ask <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

