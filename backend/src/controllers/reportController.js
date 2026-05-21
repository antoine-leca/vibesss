const models = require("../models");

// Récupérer tous les rapports
const browse = async (req, res) => {
  try {
    const [reports] = await models.report.findAllWithDetails();
    res.send(reports);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Créer un nouveau rapport
const add = async (req, res) => {
  try {
    const { report_reason, description, user_id, article_id, blog_id, comment_id } = req.body;

    const [result] = await models.report.insert({ report_reason, description });
    const report_id = result.insertId

    await models.userReport.insert({
      user_id,
      report_id,
      article_id: article_id || null,
      blog_id: blog_id || null,
      comment_id: comment_id || null
    });

    res.status(201).json({ message: "Signalement envoyé", report_id });

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
  destroy,
};