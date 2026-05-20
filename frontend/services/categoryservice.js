import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
// URL de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Récupère toutes les catégories
export const getAllCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return response.json();
};

// Récupère une catégorie par son ID
export const getCategoryById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`);
  return response.json();
};

// Crée une nouvelle catégorie
export const createCategory = async (data) => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return response.json();
};

// Met à jour une catégorie existante
export const updateCategory = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return response.json();
};

// Supprime une catégorie par son ID
export const deleteCategory = async (id) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return response.json();
};
