const AbstractManager = require("./AbstractManager");

class CategoriesManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  // Insert a new category
  insert(category) {
    return this.database.query(
      `INSERT INTO ${this.table} (label, description) VALUES (?, ?)`,
      [category.label, category.description]
    );
  }

  // Update an existing category
  update(category) {
    return this.database.query(
      `UPDATE ${this.table} SET label = ?, description = ? WHERE id = ?`,
      [category.label, category.description, category.id]
    );
  }
}

module.exports = CategoriesManager;