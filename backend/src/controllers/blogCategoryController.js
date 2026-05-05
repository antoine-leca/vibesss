const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.blogCategory.findAll();
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const findByBlogId = async (req, res) => {
  try {
    const [rows] = await models.blogCategory.findByBlogId(req.params.blogId);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const findByCategoryId = async (req, res) => {
  try {
    const [rows] = await models.blogCategory.findByCategoryId(req.params.categoryId);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  const { blog_id, categorie_id } = req.body;

  if (!blog_id || !categorie_id) {
    return res.status(400).json({ message: "blog_id et categorie_id sont requis." });
  }

  try {
    const [result] = await models.blogCategory.insert({
      blog_id,
      categorie_id,
    });
    res.status(201).json({ blog_id, categorie_id });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  const { blogId, categoryId } = req.params;

  try {
    const [result] = await models.blogCategory.deleteByBlogAndCategory(blogId, categoryId);
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
  findByBlogId,
  findByCategoryId,
  add,
  destroy,
};
