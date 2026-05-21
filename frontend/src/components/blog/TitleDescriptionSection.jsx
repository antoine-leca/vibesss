import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';

const TitleDescriptionSection = ({ title, description, onTitleChange, onDescriptionChange }) => {
  const [focusedField, setFocusedField] = useState(null);

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="relative bg-[var(--card-color)] px-6 sm:px-12 py-8">
      
      {/* TITRE */}
      <div className="relative group mb-4">
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
        
        {focusedField === 'title' && (
          <div 
            className="badge absolute -right-2 top-2 text-white shadow-lg font-custom-main"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            {title.length}/60
          </div>
        )}
        
        {!focusedField && (
          <div className="badge badge-ghost absolute -right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity font-custom-main">
            <Edit3 size={10} className="inline mr-1" />
            Éditer
          </div>
        )}
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
        
        {focusedField === 'description' && (
          <div 
            className="badge absolute -right-2 top-2 text-white shadow-lg font-custom-main"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            {description.length}/200
          </div>
        )}
        
        {!focusedField && (
          <div className="badge badge-ghost absolute -right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity font-custom-main">
            <Edit3 size={10} className="inline mr-1" />
            Éditer
          </div>
        )}
      </div>

    </div>
  );
};

export default TitleDescriptionSection;