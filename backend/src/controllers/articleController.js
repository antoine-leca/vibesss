const models = require("../models");
const sanitizeContent = require('../utils/sanitizeContent');

// 🟢 NOUVEAU : Récupérer tous les articles d'un blog spécifique
const browseByBlog = async (req, res) => {
    const blogId = parseInt(req.params.blogId, 10);

    try {
        // Appelle la méthode spécifique de ton ArticleManager
        const [articles] = await models.article.findAllByBlogId(blogId);
        res.json(articles);
    } catch (err) {
        console.error("Erreur browseByBlog:", err);
        res.sendStatus(500);
    }
};

const browse = async (req, res) => {
    try {
        const [articles] = await models.article.findAll();
        res.json(articles);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const read = async (req, res) => {
    try {
        const [articles] = await models.article.find(req.params.id);

        if (articles[0] != null) {
            res.json(articles[0]);
        } else {
            res.sendStatus(404); 
        }
    } catch (err) { 
        console.error(err);
        res.sendStatus(500);
    }
};

const edit = async (req, res) => {
    const article = req.body;
    article.id = parseInt(req.params.id, 10);

    if (article.title) {
        article.title = sanitizeContent(article.title);
    } 

    if (article.content_text) {
        article.content_text = sanitizeContent(article.content_text);
    }

    try {
        const [result] = await models.article.update(article);
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

const add = async (req, res) => {
    const article = req.body;
    
    // On récupère l'ID injecté par verifyToken
    article.user_id = req.payload.sub; 

    if (article.title) {
        article.title = sanitizeContent(article.title); 
    }

    if (article.content_text) {
        article.content_text = sanitizeContent(article.content_text);
    }

    try {
        const [result] = await models.article.insert(article);
        res.location(`/articles/${result.insertId}`).sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const destroy = async (req, res) => {
    try {
        const [result] = await models.article.delete(req.params.id);
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

const destroyAllbyUser = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    try {
        const [result] = await models.article.deleteAllByUserId(userId);
        res.sendStatus(204); 
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

module.exports = {
    browse,
    browseByBlog, // 🟢 Exporté !
    read,
    edit,
    add,
    destroy,
    destroyAllbyUser
};