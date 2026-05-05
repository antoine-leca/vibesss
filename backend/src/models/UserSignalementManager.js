const AbstractManager = require("./AbstractManager");

class UserSignalementManager extends AbstractManager {
  constructor() {
    super({ table: "user_signalement" });
  }

  insert(signalement) {
    return this.database.query(
      `INSERT INTO ${this.table} (id_user, id_article, id_blog, id_comment, id_signalement) VALUES (?, ?, ?, ?, ?)`,
      [
        signalement.id_user,
        signalement.id_article ?? null, 
        signalement.id_blog ?? null,
        signalement.id_comment ?? null,
        signalement.id_signalement
      ]
    );
  }
}

module.exports = UserSignalementManager;
