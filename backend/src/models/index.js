require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const ArticleManager = require("./ArticleManager");

models.article = new ArticleManager();
models.article.setDatabase(pool);

const ReportManager = require("./ReportManager");
models.report = new ReportManager();
models.report.setDatabase(pool);


const NotifManager = require("./NotifManager");

models.notifs = new NotifManager();
models.notifs.setDatabase(pool);

const CategoryManager = require("./CategoryManager");

models.categories = new CategoryManager();
models.categories.setDatabase(pool);


const BlogManager = require("./BlogManager");

models.blog = new BlogManager();
models.blog.setDatabase(pool);


const CommentManager = require("./CommentManager");

models.comment = new CommentManager();
models.comment.setDatabase(pool);


const UserManager = require("./UserManager");

models.user = new UserManager();
models.user.setDatabase(pool);


const UserReportManager = require('./UserReportManager');

models.userReport = new UserReportManager();
models.userReport.setDatabase(pool);


const UserLikeArticleManager = require("./UserLikeArticleManager");

models.userLikeArticle = new UserLikeArticleManager();
models.userLikeArticle.setDatabase(pool);


const RoleManager = require("./RoleManager");

models.role = new RoleManager();
models.role.setDatabase(pool);


const ThemeManager = require("./ThemeManager");

models.theme = new ThemeManager();
models.theme.setDatabase(pool);


const BlogCategoryManager = require("./BlogCategoryManager");

models.blogCategory = new BlogCategoryManager();
models.blogCategory.setDatabase(pool);


const UserRoleManager = require("./UserRoleManager");

models.userRole = new UserRoleManager();
models.userRole.setDatabase(pool);


// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};


module.exports = new Proxy(models, handler);
