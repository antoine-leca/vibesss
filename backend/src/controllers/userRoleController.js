const models = require("../models");

const add = async (req, res) => {
    const { userId, roleId } = req.body; 
    try {
        const [result] = await models.userRole.insert(userId, roleId);
        res.sendStatus(201); 
    } catch (err) {
        if (err.errno === 1062) {
            res.status(409).send("Assignation user-role existante");
        } else {
            console.error(err);
            res.sendStatus(500);
        }
    }
};

const destroy = async (req, res) => {
    const { userId, roleId } = req.body;
    try {
        const [result] = await models.userRole.delete(userId, roleId);
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