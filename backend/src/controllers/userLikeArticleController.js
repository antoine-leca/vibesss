const models = require("../models");

const add = async (req, res) => {
    
    const { userId, articleId } = req.body; 

    try {
    
        const [result] = await models.user_like_article.insert(userId, articleId);
        
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
        const [result] = await models.user_like_article.delete(userId, articleId);
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

