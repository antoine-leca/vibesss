const AbstractManager = require("./AbstractManager");

class ThemeManager extends AbstractManager {
    constructor() {
        super({ table: "themes" });
    }

    insert(theme) {
        return this.database.query(
            `INSERT INTO ${this.table} (label, color_name, font_name, bg_image) VALUES (?, ?, ?, ?)`,
            [
                theme.label,
                theme.color_name,
                theme.font_name,
                theme.bg_image
            ]
        );
    }

    update(theme) {
        return this.database.query(
            `UPDATE ${this.table} SET label = ?, color_name = ?, font_name = ?, bg_image = ? WHERE id = ?`, 
            [
                theme.label,
                theme.color_name,
                theme.font_name,
                theme.bg_image
            ]
        );
    }
}


module.exports = ThemeManager;