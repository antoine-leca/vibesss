const models = require("../models");


const browse = async (req, res) => {
  try {
    const [rows] = await models.role.findAll();
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
    try {
        const [rows] = await models.role.find(req.params.id);
        if (rows[0] == null) {
            return res.status(404);
        }
        else {
        res.status(200).json(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const add = async (req, res) => {
    const role = {...req.body};
    try {
        const [result] = await models.role.insert (role);
        res.status(201).json
        ({id: result.insertId});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    };

const edit = async (req, res) => {
    const { label } = req.body;
    const id = parseInt(req.params.id, 10);
    if (!label) {
        return res.status(400).json({ message: "Le nom du rôle est requis." });
    }
    try {
        const [result] = await models.role.update({
            id,
            label
        });

        if (result.affectedRows === 0) {
            res.status(404);
        } else {
            res.sendStatus(204);
        }   
    } catch (err) {
        console.error(err);
        res.status(500);
  }
};


const destroy = async (req, res) => {
    const [result] = await models.role.delete(req.params.id);
    try {
        if (result.affectedRows === 0) {
            res.status(404);
        }
        else {
            res.sendStatus(204);
        }
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};


module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
};