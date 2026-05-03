const models = require("../models");

const browse = async (req, res) => {
    try {
        const [rows] = await models.user.findAllUsers();
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const read = (req, res) => {
  models.user
    .findUser(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByEmail = (req, res, next) => {
  const { email } = req.body;
  models.user
    .findUserByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];
        return res.status(409).json({ message: "Cet email est déjà utilisé" });
      } else {
        return next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserByPseudo = (req, res, next) => {
  const { pseudo } = req.body;
  models.user
    .findUserByPseudo(pseudo)
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];
        return res.status(409).json({ message: "Ce pseudo est déjà utilisé" });
      } else {
        return next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const add = async (req, res) => {
    try {
        const user = req.body;
        const [result] = await models.user.insert(users);
        res.location(`/users/${result.insertId}`).sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
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