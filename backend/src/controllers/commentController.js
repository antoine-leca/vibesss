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
  const { content, article_id, user_id } = req.body;

  try {
    // 1. On crée le commentaire
    const [result] = await models.comment.insert({ content, article_id, user_id });
    const commentId = result.insertId;

    // 2. On récupère l'auteur de l'article pour savoir qui notifier
    const [[article]] = await models.article.find(article_id);
    const ownerId = article.user_id;

    // 3. On crée la notification (seulement si ce n'est pas l'auteur qui commente son propre article)
    if (ownerId !== user_id) {
      await models.notif.insert({
        notif_type: "comment",
        comment_id: commentId,
        article_id: article_id,
        user_id: ownerId // C'est le propriétaire du blog/article qui reçoit
      });
    }

    res.status(201).json({ id: commentId });
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