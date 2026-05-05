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
    const [rows] = await models.userReport.find(req.params.id);
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
    const id = parseInt(req.params.id, 10);
    const [result] = await models.userReport.delete(id);

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