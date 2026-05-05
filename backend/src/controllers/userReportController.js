const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.userReport.findAll();
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const reportId = parseInt(req.params.reportId, 10);

    const [rows] = await models.userReport.findSpecific(userId, reportId);

    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  const report = req.body;

  try {
    const [result] = await models.userReport.insert(report);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};


const destroy = async (req, res) => {
  try {
    // Utilise les noms définis dans le router (:userId et :reportId)
    const userId = parseInt(req.params.userId, 10); 
    const reportId = parseInt(req.params.reportId, 10);

    // Vérification de sécurité pour éviter le NaN dans SQL
    if (isNaN(userId) || isNaN(reportId)) {
        return res.status(400).send("IDs invalides");
    }

    const [result] = await models.userReport.deleteSpecific(userId, reportId);

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
  read,
  add,
  destroy,
};