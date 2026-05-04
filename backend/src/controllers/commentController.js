const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.comment.findAll();
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const [rows] = await models.comment.find(req.params.id);
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  const { content, article_id, user_id, moderation_status } = req.body;

  try {
    const [result] = await models.comment.insert({
      content,
      article_id,
      user_id,
      moderation_status: moderation_status || "pending",
    });
    res.status(201).json({ id: result.insertId, content, article_id, user_id });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  const { content, moderation_status } = req.body;
  const id = parseInt(req.params.id, 10);

  try {
    const [result] = await models.comment.update({
      id,
      content,
      moderation_status,
    });

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

const destroy = async (req, res) => {
  try {
    const [result] = await models.comment.delete(req.params.id);

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
  edit,
  destroy,
};
;