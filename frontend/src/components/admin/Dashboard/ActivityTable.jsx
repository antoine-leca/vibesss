import React from 'react';
import ActivityItem from './ActivityItem';

const ActivityTable = ({ currentItems, pagination }) => {
  const { currentPage, totalPages, prevPage, nextPage } = pagination;

  return (
    <div className="space-y-3">
      <div className="bg-white/55 backdrop-blur-md rounded-2xl border-2 border-white/70 overflow-hidden max-h-96">
        {currentItems.length > 0 ? (
          <div className="py-2 max-h-90 overflow-hidden">
            {currentItems.map((item, index) => (
              <ActivityItem
                key={index}
                item={item}
                index={index}
                currentPage={currentPage}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-[11px] italic text-gray-400 opacity-60">
            Aucune activité récente
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-1 px-3 disabled:opacity-0 hover:bg-black/5 rounded-full transition-all text-gray-600 font-black"
          >
            ←
          </button>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="p-1 px-3 disabled:opacity-0 hover:bg-black/5 rounded-full transition-all text-gray-600 font-black"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;