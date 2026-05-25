const models = require("../models");

const browse = async (req, res) => {
    try {
        const [rows] = await models.notif.findAll();
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const getUnread = async (req, res) => {
    try {
        const [rows] = await models.notif.findUnreadByUser(req.params.userId);
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const getByUser = async (req, res) => {
    try {
        const [rows] = await models.notif.findByUserWithDetails(req.params.userId);
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const add = async (req, res) => {
    try {
        const notif = req.body;
        const [result] = await models.notif.insert(notif);
        res.location(`/notifications/${result.insertId}`).sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const markAsRead = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const [result] = await models.notif.markAsRead(id);

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

        const [result] = await models.notif.delete(req.params.id);
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
    getUnread,
    getByUser,
    add,
    markAsRead,
    destroy,
};