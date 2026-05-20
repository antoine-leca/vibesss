import React from 'react';
import ActivityRow from './ActivityRow';

const ActivityTable = ({ activities, pagination }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse text-[12px]">
          <thead>
            <tr className="border-b border-white/20 text-gray-700 bg-white/10 uppercase text-[10px] tracking-wider font-bold">
              <th className="py-2 px-3 w-12 text-center">N°</th>
              <th className="py-2 px-3 text-center">Type</th>
              <th className="py-2 px-3 text-right">Heure</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 font-medium">
            {activities.length > 0 ? (
              activities.map((item, index) => (
                <ActivityRow 
                  key={index} 
                  item={item} 
                  index={index} 
                  currentPage={pagination.currentPage} 
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-10 text-center opacity-30 italic text-[11px]">Aucune activité récente</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Uniquement si nécessaire */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-2">
          <button 
            onClick={pagination.prevPage}
            disabled={pagination.currentPage === 1}
            className="p-1 px-3 disabled:opacity-0 hover:bg-black/5 rounded-full transition-all text-gray-700 font-black"
          >
            ←
          </button>
          <span className="text-[10px] font-bold text-gray-500 uppercase">
            Page {pagination.currentPage} / {pagination.totalPages}
          </span>
          <button 
            onClick={pagination.nextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="p-1 px-3 disabled:opacity-0 hover:bg-black/5 rounded-full transition-all text-gray-700 font-black"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;