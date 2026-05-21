import { useState } from "react";

export const usePagination = (data = [], itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Si data est vide, totalPages = 0.
    const totalPages = data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 0;
    
    const currentItems = data.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    return {
        currentItems,
        currentPage,
        totalPages,
        nextPage: () => setCurrentPage(p => Math.min(p + 1, totalPages)),
        prevPage: () => setCurrentPage(p => Math.max(p - 1, 1))
    };
};