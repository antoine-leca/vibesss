const AbstractManager = require("./AbstractManager");

class UserBlogManager extends AbstractManager {
    constructor() {
        super({ table: "users_blogs" });
    }

    insert(userId, blogId) {
        return this.database.query(
            `INSERT INTO ${this.table} (user_id, blog_id) VALUES (?,?)`,
            [
                userId,
                blogId
            ]
        );
    }

    delete(userId, blogId) {
        return this.database.query(
            `DELETE FROM ${this.table} WHERE user_id = ? AND blog_id = ?`,
            [
                userId,
                blogId
            ]
        );
    }
}


module.exports = UserBlogManager;
