const AbstractManager = require("./AbstractManager");

class UserBlogManager extends AbstractManager {
    constructor() {
        super({ table: "users_blogs" });
    }

    insert(userblog) {
        return this.database.query(
            `INSERT INTO ${this.table} (user_id, blog_id) VALUES (?,?)`,
            [
                userblog.user_id,
                userblog.blog_id
            ]
        );
    }

}


module.exports = UserBlogManager;