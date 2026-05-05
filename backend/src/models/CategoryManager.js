const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  insert(category) {
    return this.database.query(
      `INSERT INTO ${this.table} (label, description) VALUES (?, ?)`,
      [category.label, category.description]
    );
  }

  update(category) {
    return this.database.query(
      `UPDATE ${this.table} SET label = ?, description = ? WHERE id = ?`,
      [category.label, category.description, category.id]
    );
  }
}

module.exports = CategoryManager;
