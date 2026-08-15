import React from 'react';

export const Badge = ({
  children,
  variant = 'brand',
  size = 'md',
  icon: Icon,
  className = ''
}) => {
  const variants = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    yellow: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
    red: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
    blue: 'bg-sky-100 text-sky-800 border-sky-300 font-bold'
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide ${variants[variant] || variants.brand} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
