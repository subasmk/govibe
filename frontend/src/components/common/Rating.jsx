import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  showNumber = true,
  count,
  interactive = false,
  onChange,
  className = ''
}) => {
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold',
    xl: 'text-lg font-bold'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5 text-amber-400">
        {[...Array(max)].map((_, i) => {
          const ratingValue = i + 1;
          const isFilled = value >= ratingValue;
          const isHalf = !isFilled && value >= ratingValue - 0.5;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(ratingValue)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            >
              {isFilled ? (
                <Star className={`${starSizes[size]} fill-amber-400 text-amber-400`} />
              ) : isHalf ? (
                <StarHalf className={`${starSizes[size]} fill-amber-400 text-amber-400`} />
              ) : (
                <Star className={`${starSizes[size]} text-slate-200 fill-slate-100`} />
              )}
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className={`text-slate-800 ${textSizes[size]}`}>
          {Number(value).toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-slate-400 font-normal">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};
