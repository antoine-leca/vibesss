const AbstractManager = require("./AbstractManager");

class UserReportManager extends AbstractManager {
  constructor() {
    super({ table: "users_reports" });
  }

  insert(report) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, article_id, blog_id, comment_id, report_id) VALUES (?, ?, ?, ?, ?)`,
      [
        report.user_id,
        report.article_id,
        report.blog_id,
        report.comment_id,
        report.report_id
      ]
    );
  }
}

module.exports = UserReportManager;