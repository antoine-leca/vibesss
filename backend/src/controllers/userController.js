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
    // On tente d'abord de trouver l'utilisateur par ID
    let [rows] = await models.user.findUser(req.params.id);

    // Si rien n'est trouvé (cas où le paramètre est un pseudo), on cherche par pseudo
    if (rows[0] == null) {
      [rows] = await models.user.findUserByPseudo(req.params.id);
    }

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
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const failed = [];
  if (password.length < 8) failed.push("8 caractères minimum");
  if (!/[A-Z]/.test(password)) failed.push("une majuscule");
  if (!/[a-z]/.test(password)) failed.push("une minuscule");
  if (!/[0-9]/.test(password)) failed.push("un chiffre");
  if (!/[^A-Za-z0-9]/.test(password)) failed.push("un caractère spécial");
  if (failed.length > 0) {
    return res.status(400).json({
      message: `Le mot de passe doit contenir ${failed.join(", ")}`
    });
  }
  next();
};

const checkEmailAvailability = async (req, res, next) => {
  const { email } = req.body;
  try {
    const [users] = await models.user.findUserByEmail(email);
    if (users[0] != null) {
      return res.status(409).json({ message: "Cette adresse email est déjà utilisée" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const add = async (req, res) => {
  try {
    const [result] = await models.user.insert(req.body);
    const userId = result.insertId;

    res.location(`/users/${userId}`).sendStatus(201);
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur:", err);
    if (err.code === "ER_DUP_ENTRY") {
      if (err.message.includes("pseudo")) {
        return res.status(409).json({ message: "Ce pseudo est déjà utilisé" });
      }
      if (err.message.includes("email")) {
        return res.status(409).json({ message: "Cette adresse email est déjà utilisée" });
      }
      return res.status(409).json({ message: "Ces informations sont déjà utilisées" });
    }
    res.status(500).json({ message: "Erreur lors de la création du compte" });
  }
};

const edit = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { firstname, lastname, bio } = req.body; // Seuls les champs modifiables sont extraits

    const [result] = await models.user.update(userId, firstname, lastname, bio);
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

// Modification du rôle d'un utilisateur par un Admin (RBAC)
const editRole = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { role_id } = req.body;

    if (!role_id || ![1, 2].includes(Number(role_id))) {
      return res.status(400).json({ message: "Le role_id fourni est invalide (doit être 1 ou 2)" });
    }

    const [result] = await models.user.updateRole(userId, role_id);

    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
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
    const [usersRows] = await models.user.getCounter();
    const [blogsRows] = await models.blog.getCounter();
    const [articlesRows] = await models.article.getCounter();
    const [reportsRows] = await models.report.getCounter();

    const users = usersRows[0] || {};
    const blogs = blogsRows[0] || {};
    const articles = articlesRows[0] || {};
    const reports = reportsRows[0] || {};

    res.json({
      users: users.total ?? users["COUNT(*)"] ?? 0,
      blogs: blogs.total ?? blogs["COUNT(*)"] ?? 0,
      articles: articles.total ?? articles["COUNT(*)"] ?? 0,
      reports: reports.total ?? reports["COUNT(*)"] ?? 0,
    });
  } catch (err) {
    console.error("Erreur dans getStats :", err);
    res.status(500).send("Erreur lors de la récupération des statistiques");
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
  validatePassword,
  checkEmailAvailability,
  getStats,
  add,
  edit,
  editRole,
  destroy,
  getActivities,
};