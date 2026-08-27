import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../src/hooks/usePagination';

describe('usePagination Hook', () => {
    const mockData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

    test('doit calculer le bon nombre de pages (25 éléments / 10 par page = 3 pages)', () => {
        const { result } = renderHook(() => usePagination(mockData, 10));
        
        expect(result.current.totalPages).toBe(3);
        expect(result.current.currentPage).toBe(1);
        expect(result.current.currentItems).toHaveLength(10);
    });

    test('doit retourner les bons éléments selon la page', () => {
        const { result } = renderHook(() => usePagination(mockData, 10));

        // On passe à la page 2
        act(() => {
            result.current.nextPage();
        });

        expect(result.current.currentPage).toBe(2);
        // Le premier élément de la page 2 doit être l'ID 11
        expect(result.current.currentItems[0].id).toBe(11);
        expect(result.current.currentItems).toHaveLength(10);
    });

    test('ne doit pas dépasser la dernière page (25 éléments = max page 3)', () => {
        const { result } = renderHook(() => usePagination(mockData, 10));

        act(() => {
            result.current.nextPage(); // Page 2
            result.current.nextPage(); // Page 3
            result.current.nextPage(); // Tente d'aller en page 4
        });

        expect(result.current.currentPage).toBe(3);
        // La dernière page ne contient que les 5 éléments restants
        expect(result.current.currentItems).toHaveLength(5);
    });
});