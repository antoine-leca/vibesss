const models = require("../models");


const browse = async (req, res) => {
  try {
    const [rows] = await models.blog.findAll();
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {

  try {

    const [rows] = await models.blog.find(req.params.id);

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

  const { user_id, theme_id, title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: "Le titre est requis." });
  }

  try {

    const [result] = await models.blog.insert ({
      user_id,
      theme_id: theme_id ?? null,
      title,
      description: description ?? null,
      creation_date: new Date(),
    });

    res.status(201).json({
      id: result.insertId,
    });

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
 
  const { theme_id, title, description } = req.body;
   const id = parseInt(req.params.id, 10);
  if (!title) {
    return res.status(400).json({ message: "Le titre est requis." });
  }

  try {

    const [result] = await models.blog.update({
        id,
        theme_id,
        title,
        description
    });

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


const destroy = async (req, res) => {
    const [result] = await models.blog.delete(req.params.id);

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