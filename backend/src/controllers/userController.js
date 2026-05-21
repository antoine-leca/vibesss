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
      next();
    } else {
      return res.status(409).json({ message: "Les identifiants sont incorrects " });
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
    const userId = result.insertId;

    await models.userRole.insert(userId, 1);

    res.location(`/users/${userId}`).sendStatus(201);
  } catch (err) {
    console.error("Erreur lors de la création user/role:", err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    const user = req.body;
    user.id = parseInt(req.params.id, 10);

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

const getStats = async (req, res) => {
  try {
    const [[users]] = await models.user.getCounter();
    const [[blogs]] = await models.blog.getCounter();
    const [[articles]] = await models.article.getCounter();
    const [[reports]] = await models.report.getCounter();

    res.json({
      users: users.total,
      blogs: blogs.total,
      articles: articles.total,
      reports: reports.total
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récuperation des statistiques");
  }

};

const getActivities = async (req, res) => {
  try {
    const [activities] = await models.user.getLatestActivities();
    res.json(activities);
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
  getStats,
  add,
  edit,
  destroy,
  getActivities,
};