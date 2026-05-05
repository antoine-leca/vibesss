const AbstractManager = require("./AbstractManager");

class UserSignalementManager extends AbstractManager {
  constructor() {
    super({ table: "users_reports" });
  }

  insert(signalement) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, article_id, blog_id, comment_id, report_id) VALUES (?, ?, ?, ?, ?)`,
      [
        signalement.user_id,
        signalement.article_id,
        signalement.blog_id,
        signalement.comment_id,
        signalement.report_id
      ]
    );
  }
}

module.exports = UserSignalementManager;