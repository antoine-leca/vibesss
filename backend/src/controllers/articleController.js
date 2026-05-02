
const models = require("../models");


    const browse = async (req, res) => {
        try {
            const [articles] = await models.article.findAll();
            res.json(articles)
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
        read,
        edit,
        add,
        destroy,
        destroyAllbyUser
    }