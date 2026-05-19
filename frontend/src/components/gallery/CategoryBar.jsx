import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'foryou', name: 'FOR YOU', bgColor: 'var(--primary-color, #e99fb4)', textColor: '#fff' },
  { id: 'chill', name: 'CHILL', bgColor: 'var(--secondary-color, #B5A2D7)', textColor: '#fff' },
  { id: 'dance', name: 'DANCE', bgColor: 'var(--category-color, #A7CBE0)', textColor: '#fff' },
  { id: 'lofi', name: 'LOFI', bgColor: 'var(--accent-color, #EFC3A7)', textColor: '#333' },
  { id: 'focus', name: 'FOCUS', bgColor: 'var(--success-color, #A7C49F)', textColor: '#333' },
  { id: 'indie', name: 'INDIE', bgColor: '#F4E5A1', textColor: '#333' },
  { id: 'party', name: 'PARTY', bgColor: '#D0A0E0', textColor: '#fff' },
];

export default function CategoryBar({ categories = CATEGORIES, selectedCategory, onSelect }) {
  const [internalSelected, setInternalSelected] = useState(categories[0]?.id);

  const selected = selectedCategory !== undefined ? selectedCategory : internalSelected;

  const handleSelect = (id) => {
    if (selectedCategory === undefined) {
      setInternalSelected(id);
    }
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <div className="w-full overflow-x-auto overscroll-x-contain no-scrollbar py-4 md:py-6" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="flex items-center gap-2.5 md:gap-4 w-max lg:mx-auto px-4 md:px-6">
        {categories.map((cat) => {
          const isSelected = selected === cat.id;
          return (
             <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`
                flex-shrink-0 whitespace-nowrap px-4 py-2 md:px-7 md:py-3 rounded-full font-bold text-xs md:text-sm
                transition-all duration-300 uppercase tracking-wide
                ${isSelected 
                  ? 'border-[2px] md:border-[3px] border-[#111] shadow-[3px_4px_8px_rgba(0,0,0,0.15)] md:shadow-[4px_6px_10px_rgba(0,0,0,0.15)] scale-[1.03] z-10' 
                  : 'border-[2px] md:border-[3px] border-transparent opacity-90 hover:opacity-100 shadow-sm hover:scale-[1.02]'
                }
              `}
              style={{
                backgroundColor: cat.bgColor,
                color: cat.textColor,
                fontFamily: "var(--main-font, 'Libre Franklin', sans-serif)"
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
