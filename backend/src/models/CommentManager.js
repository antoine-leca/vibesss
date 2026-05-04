const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  //Create
  insert(comment) {
    return this.database.query(
      `insert into ${this.table} (content, article_id, user_id, created_at) values (?, ?, ?, NOW())`,
      [comment.content, comment.article_id, comment.user_id]
    );
  }

  //Update
  update(comment) {
    return this.database.query(
      `update ${this.table} set content = ? where id = ?`,
      [comment.content, comment.id]
    );
  }


}

module.exports = CommentManager;