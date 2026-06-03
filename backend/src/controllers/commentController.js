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

const readByArticle = async (req, res) => {
  try {
    const [rows] = await models.comment.findByArticleId(req.params.articleId);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  const { content, article_id, user_id } = req.body;

  try {
    // Validation basique
    if (!content || !article_id || !user_id) {
      console.error("❌ Données manquantes:", { content, article_id, user_id });
      return res.status(400).json({ error: "content, article_id et user_id sont requis" });
    }

    console.log("📝 Création commentaire:", { content: content.substring(0, 50), article_id, user_id });

    // 1. On crée le commentaire
    const [result] = await models.comment.insert({ content, article_id, user_id });
    const commentId = result.insertId;
    console.log("✅ Commentaire créé avec ID:", commentId);

    // 2. On récupère le commentaire créé avec les infos de l'utilisateur
    const [commentRows] = await models.comment.find(commentId);
    
    if (!commentRows || commentRows.length === 0) {
      console.error("❌ Commentaire non trouvé après insertion");
      return res.status(500).json({ error: "Commentaire créé mais non trouvable" });
    }
    
    const newComment = commentRows[0];
    console.log("✅ Commentaire récupéré:", newComment.id);

    // 3. Notification en arrière-plan (ne bloque pas la réponse)
    (async () => {
      try {
        const [[article]] = await models.article.find(article_id);
        
        if (!article) {
          console.warn("⚠️ Article non trouvé:", article_id);
          return;
        }

        const ownerId = article.user_id;

        // Création de la notification (seulement si ce n'est pas l'auteur qui commente son propre article)
        if (ownerId !== user_id) {
          await models.notif.insert({
            notif_type: "comment",
            comment_id: commentId,
            article_id: article_id,
            user_id: ownerId,
            sender_id: user_id      
          });
          console.log("✅ Notification créée pour l'utilisateur:", ownerId);
        }
      } catch (notifErr) {
        console.error("⚠️ Erreur lors de la création de la notification:", notifErr.message);
        // Ne pas bloquer la réponse si la notification échoue
      }
    })();

    // On retourne le commentaire au client immédiatement
    res.status(201).json(newComment);
  } catch (err) {
    console.error("🚨 Erreur lors de l'insertion du commentaire:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ error: err.message });
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
  readByArticle,
  add,
  edit,
  destroy,
};