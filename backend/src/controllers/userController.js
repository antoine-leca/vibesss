const models = require("../models");
const auth = require("../auth");

const browse = async (req, res) => {
    try {
        const [rows] = await models.user.findAllUsers();
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const read = async (req, res) => {
  try {
    const [rows] = await models.user.findUser(req.params.id);
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const [users] = await models.user.findUserByEmail(email);
    if (users[0] != null) {
      req.user = users[0];
      return res.status(409).json({ message: "Cet email est déjà utilisé" });
    } else {
      return next();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  }
};

const getUserByPseudo = async (req, res, next) => {
  const { pseudo } = req.body;
  try {
    const [users] = await models.user.findUserByPseudo(pseudo);
    if (users[0] != null) {
      req.user = users[0];
      return res.status(409).json({ message: "Ce pseudo est déjà utilisé" });
    } else {
      return next();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  }
};

const add = async (req, res) => {
    try {
        const [result] = await models.user.insert(req.body);
        res.location(`/users/${result.insertId}`).sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};


const edit = async (req, res) => {
  try {
    const user = req.body;
    user.id = parseInt(req.params.id, 10);
    
    if (user.password) {
      
      user.password = await auth.hashPlainPassword(user.password);
    }

    const [result] = await models.user.update(user);
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
    const [result] = await models.user.delete(req.params.id);
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
  getUserByEmail,
  getUserByPseudo,
  add,
  edit,
  destroy,
};