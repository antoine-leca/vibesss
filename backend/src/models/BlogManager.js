const AbstractManager = require("./AbstractManager");

class BlogManager extends AbstractManager {
    constructor() {
        super({ table: "blogs" });
    }

    insert(blog) {
        return this.database.query(
            `INSERT INTO ${this.table} (user_id, theme_id, title, creation_date) VALUES (?, ?, ?, ?)`,
            [
                blog.user_id,
                blog.theme_id,
                blog.title,
                blog.creation_date
            ]
        );
    }

    update(blog) {
        return this.database.query(
            `UPDATE ${this.table} SET theme_id = ?, title = ? WHERE id = ?`, 
            [
                blog.theme_id,
                blog.title,
                blog.id
            ]
        );
    }
}


module.exports = BlogManager;
