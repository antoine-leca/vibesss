const models = require("../models");


const getAllCategories = async (req, res) => {
  try {
    const [rows] = await models.categories.findAll();

    res.status(200).json(rows);
  } catch (err) {

    console.error(err);
    res.status(500).send("Erreur lors de la récupération des catégories");
  }
};


const getCategoryById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const [rows] = await models.categories.find(id);
    if (rows.length) {

      res.status(200).json(rows[0]);
    } else {

      res.status(404).send("Catégorie non trouvée");
    }
  } catch (err) {

    console.error(err);
    res.status(500).send("Erreur lors de la récupération de la catégorie");
  }
};


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