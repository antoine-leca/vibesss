const models = require("../models");

const add = async (req, res) => {
    const { userId, articleId } = req.body; // userId = celui qui like

    try {
        //  On ajoute le like en DB
        await models.userLikeArticle.insert(userId, articleId);
        
        // 2. On récupère le propriétaire de l'article
        const [[article]] = await models.article.find(articleId);
        const ownerId = article.user_id;

        // 3. On crée la notification de type 'like'
        if (ownerId !== userId) {
            await models.notif.insert({
                notif_type: "like",
                article_id: articleId,
                user_id: ownerId,
                sender_id: userId
            });
        }

        res.sendStatus(201); 
    } catch (err) {
        if (err.errno === 1062) {
            res.status(409).send("Déjà liké");
        } else {
            console.error(err);
            res.sendStatus(500);
        }
    }
};

const destroy = async (req, res) => {
    const { userId, articleId } = req.body;

    try {
        const [result] = await models.userLikeArticle.deleteLike(userId, articleId);
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
    add,
    destroy
};

