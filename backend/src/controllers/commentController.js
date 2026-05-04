const models = require("../models");

class CommentController {
  // R - Read : Récupérer tous les commentaires
  static browse = async (req, res) => {
    try {
      const [comments] = await models.comment.findAll();
      res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  // R - Read : Récupérer un commentaire spécifique par son ID
  static read = async (req, res) => {
    try {
      const [comment] = await models.comment.find(req.params.id);
      if (comment[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(comment[0]);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  // E - Edit : Modifier un commentaire
  static edit = async (req, res) => {
    const comment = req.body;
    comment.id = parseInt(req.params.id, 10);

    try {
      const [result] = await models.comment.update(comment);
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204); // Succès, pas de contenu à renvoyer
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  // A - Add : Créer un nouveau commentaire
  static add = async (req, res) => {
    const comment = req.body;

    try {
      const [result] = await models.comment.insert(comment);
      res.status(201).send({ id: result.insertId, ...comment });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  // D - Delete : Supprimer un commentaire
  static destroy = async (req, res) => {
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
}

module.exports = CommentController;