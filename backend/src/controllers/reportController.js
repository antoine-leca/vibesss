const models = require("../models");

// Récupérer tous les rapports
const browse = async (req, res) => {
  try {
    const [reports] = await models.report.findAll();
    res.send(reports);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Créer un nouveau rapport
const add = async (req, res) => {
  try {
    const report = req.body;
    const [result] = await models.report.insert(report);
    res.location(`/reports/${result.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    const { status } = req.body;
    const id = parseInt(req.params.id, 10);

    // On passe l'objet partiel au manager
    const [result] = await models.report.update({ id, status });

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};  

// Supprimer un rapport
const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [result] = await models.report.delete(id);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  add,
  edit,
  editFull,
  destroy,
};