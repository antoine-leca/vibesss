const models = require("../models");

// Contrôleur pour récupérer toutes les catégories depuis la base de données
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await models.categories.findAll();
    // Envoyer les catégories récupérées en réponse JSON
    res.status(200).json(rows);
  } catch (err) {
    // En cas d'erreur, afficher l'erreur et envoyer un code 500
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des catégories");
  }
};

// Contrôleur pour récupérer une catégorie spécifique par son ID
const getCategoryById = async (req, res) => {
  const id = parseInt(req.params.id, 10); // Récupérer l'ID depuis les paramètres de la requête

  try {
    const [rows] = await models.categories.find(id);
    if (rows.length) {
      // Si la catégorie existe, l'envoyer en réponse JSON
      res.status(200).json(rows[0]);
    } else {
      // Si aucune catégorie n'est trouvée, envoyer un code 404
      res.status(404).send("Catégorie non trouvée");
    }
  } catch (err) {
    // En cas d'erreur, afficher l'erreur et envoyer un code 500
    console.error(err);
    res.status(500).send("Erreur lors de la récupération de la catégorie");
  }
};

// Contrôleur pour mettre à jour une catégorie
const updateCategory = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;

  try {
    const [result] = await models.categories.update(id, { name });
    if (result.affectedRows) {
      res.status(200).send("Catégorie mise à jour avec succès");
    } else {
      res.status(404).send("Catégorie non trouvée");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la mise à jour de la catégorie");
  }
};

// Contrôleur pour supprimer une catégorie
const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const [result] = await models.categories.delete(id);
    if (result.affectedRows) {
      res.status(200).send("Catégorie supprimée avec succès");
    } else {
      res.status(404).send("Catégorie non trouvée");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la suppression de la catégorie");
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};