const models = require("../models");


const browse = async (req, res) => {
  try {
    const [rows] = await models.theme.findAll();
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {

  try {

    const [rows] = await models.theme.find(req.params.id);

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

  const theme = {...req.body};

  try {

    const [result] = await models.theme.insert (theme);

    res.status(201).json({
      id: result.insertId,
    });

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
 
  const { label, color_name, font_name, bg_image } = req.body;
   const id = parseInt(req.params.id, 10);
  
  try {

    const [result] = await models.theme.update({
        id,
        label,
        color_name,
        font_name,
        bg_image
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
    const [result] = await models.theme.delete(req.params.id);

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