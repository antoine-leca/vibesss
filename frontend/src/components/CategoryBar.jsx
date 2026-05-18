import { useState, useEffect } from 'react';

// Composant qui affiche une barre de catégories filtrables
// Props: onCategorySelect - fonction callback appelée quand une catégorie est sélectionnée
export default function CategoryBar({ onCategorySelect }) {
  // État pour stocker la liste des catégories
  const [categories, setCategories] = useState([]);
  // État pour stocker l'ID de la catégorie sélectionnée
  const [selected, setSelected] = useState(null); // null signifie "toutes les catégories"
  
  // Au chargement du composant, récupère les catégories de l'API
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fonction asynchrone pour récupérer les catégories depuis le backend
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories"); // Envoie une requête GET à l'API pour obtenir les catégories.
      const data = await response.json(); //Transforme la réponse HTTP en objet JavaScript.
      setCategories(data);
    } catch (error) { // En cas d'erreur, affiche un message dans la console
      console.error('Erreur:', error);
    }
  };

  // Gère la sélection d'une catégorie
  // Met à jour l'état local et appelle le callback du parent
  const handleSelect = (id) => {
    setSelected(id);
    onCategorySelect?.(id); // on appelle la fonction seulement si elle existe.
  }; // on appelle la fonction quand on clique sur la categorie.

  return (
    <div className="flex gap-2 p-4 bg-white border-b overflow-x-auto">
      {/* Bouton pour afficher toutes les catégories */}
      <button
        onClick={() => handleSelect(null)} // quand on clique, aucune categorie n'est sélectionnée.
        className={`px-4 py-2 rounded whitespace-nowrap ${
          selected === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        Tous
      </button>
      {/* Boucle sur chaque catégorie pour créer un bouton */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleSelect(cat.id)} // quand on clique, la catégorie correspondante est sélectionnée.
          className={`px-4 py-2 rounded whitespace-nowrap ${
            selected === cat.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
