const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  findAll() {
    return this.database.query(
      `select c.*, u.pseudo, u.profile_picture 
       from ${this.table} c 
       join users u on c.user_id = u.id 
       order by c.comment_date desc`
    );
  }

  find(id) {
    return this.database.query(
      `select c.*, u.pseudo, u.profile_picture 
       from ${this.table} c 
       join users u on c.user_id = u.id 
       where c.id = ?`,
      [id]
    );
  }

  //Create
  insert(comment) {
    return this.database.query(
      `insert into ${this.table} (content, moderation_status, article_id, user_id) values (?, ?, ?, ?)`,
      [comment.content, comment.moderation_status, comment.article_id, comment.user_id]
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
