const models = require("../models");


const add = async (req, res) => {

  const userBlog = {...req.body};

  try {

    const [result] = await models.userBlog.insert (userBlog);

    res.status(201).json({
      id: result.insertId,
    });

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
    const [result] = await models.userBlog.delete(req.params.id);

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
  add,
  destroy
};