import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';

const TitleDescriptionSection = ({ title, description, onTitleChange, onDescriptionChange }) => {
  const [focusedField, setFocusedField] = useState(null);

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const getProgressPercentage = (current, max) => (current / max) * 100;

  const renderBadge = (current, max) => {
    const percentage = getProgressPercentage(current, max);
    const isWarning = percentage > 80;
    
    return (
      <div className="absolute -right-2 top-2 flex flex-col items-center gap-1">
        <div className="px-3 py-1.5 rounded-lg text-white text-xs font-bold font-custom-main shadow-lg transition-all"
          style={{ 
            backgroundColor: isWarning ? '#FF6B6B' : 'var(--primary-color)'
          }}>
          {current}/{max}
        </div>
        {/* Mini progress bar */}
        <div className="w-16 h-1 bg-black/10 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: isWarning ? '#FF6B6B' : 'var(--primary-color)'
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-white px-6 sm:px-12 py-8">
      
      {/* TITRE */}
      <div className="relative group mb-6">
        <textarea
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          onFocus={() => setFocusedField('title')}
          onBlur={() => setFocusedField(null)}
          onInput={autoResize}
          className="w-full text-4xl sm:text-5xl lg:text-6xl font-custom-title font-bold text-black leading-tight resize-none overflow-hidden bg-transparent focus:outline-none focus:ring-2 rounded-lg px-2 py-2 transition-all"
          style={{ 
            height: 'auto',
            minHeight: '2.5em',
            '--tw-ring-color': 'var(--primary-color)',
            '--tw-ring-opacity': '0.3'
          }}
          placeholder="Titre de votre blog"
          maxLength={60}
          rows={2}
        />
        
        {focusedField === 'title' && renderBadge(title.length, 60)}
        
      </div>

      {/* DESCRIPTION */}
      <div className="relative group">
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          onFocus={() => setFocusedField('description')}
          onBlur={() => setFocusedField(null)}
          onInput={autoResize}
          className="w-full text-lg sm:text-xl text-black/70 leading-relaxed resize-none overflow-hidden bg-transparent focus:outline-none focus:ring-2 rounded-lg px-2 py-2 transition-all font-custom-main"
          style={{ 
            height: 'auto',
            minHeight: '2.5em',
            '--tw-ring-color': 'var(--primary-color)',
            '--tw-ring-opacity': '0.3'
          }}
          placeholder="Description de votre blog..."
          maxLength={200}
          rows={2}
        />
        
        {focusedField === 'description' && renderBadge(description.length, 200)}
        
      </div>

    </div>
  );
};

export default TitleDescriptionSection;