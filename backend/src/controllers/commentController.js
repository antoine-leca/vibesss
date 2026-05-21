const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.comment.findAll();
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const [rows] = await models.comment.find(req.params.id);
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  const { content, moderation_status } = req.body;
  let { article_id } = req.body;
  const user_id = req.payload.sub;

  try {
    if (!article_id) {
      const [articles] = await models.article.findAll();
      if (articles.length > 0) {
        article_id = articles[0].id;
      } else {
        // Create default theme, blog, and article so comments can be inserted
        const [themes] = await models.theme.findAll();
        let themeId;
        if (themes.length > 0) {
          themeId = themes[0].id;
        } else {
          const [newTheme] = await models.theme.insert({
            label: "Default Theme",
            color_name: "pink",
            font_name: "sans-serif",
            bg_image: "default.jpg"
          });
          themeId = newTheme.insertId;
        }

        const [blogs] = await models.blog.findAll();
        let blogId;
        if (blogs.length > 0) {
          blogId = blogs[0].id;
        } else {
          const [newBlog] = await models.blog.insert({
            title: "Mon premier blog",
            description: "Bienvenue sur mon blog",
            theme_id: themeId,
            user_id: user_id
          });
          blogId = newBlog.insertId;
        }

        const [newArticle] = await models.article.insert({
          user_id,
          blog_id: blogId,
          title: "Premier article de discussion",
          content_text: "Cet article héberge les commentaires globaux.",
          content_image: "",
          release_date: new Date(),
          creation_date: new Date(),
          status: "published"
        });
        article_id = newArticle.insertId;
      }
    }

    const [result] = await models.comment.insert({
      content,
      article_id,
      user_id,
      moderation_status: moderation_status || "pending",
    });

    const [newCommentRows] = await models.comment.find(result.insertId);
    res.status(201).json(newCommentRows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  const { content, moderation_status } = req.body;
  const id = parseInt(req.params.id, 10);

  try {
    const [result] = await models.comment.update({
      id,
      content,
      moderation_status,
    });

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
    const [result] = await models.comment.delete(req.params.id);

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
  add,
  edit,
  destroy,
};
;