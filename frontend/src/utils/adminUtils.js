// frontend/src/utils/adminUtils.js (À créer ou intégrer)
export const isAdminValue = (value) => {
    if (value == null) return false;
    const normalized = String(value).toLowerCase();
    return ["admin", "2", "true"].includes(normalized);
};

export const extractRoleValue = (item) => {
    if (item == null) return null;
    if (typeof item !== "object") return item;
    return item.label ?? item.name ?? item.role ?? item.role_id ?? item.id ?? item.value;
};

export const checkIsAdmin = (user) => {
    if (!user) return false;
    
    // Vérification dans le tableau de rôles
    if (Array.isArray(user.roles)) {
        if (user.roles.some(role => isAdminValue(extractRoleValue(role)))) return true;
    }

    // Autres structures possibles (objet unique, id direct, flag)
    if (user.roles && isAdminValue(extractRoleValue(user.roles))) return true;
    if (user.role && isAdminValue(extractRoleValue(user.role))) return true;
    if (user.role_id && isAdminValue(user.role_id)) return true;
    if (user.is_admin && isAdminValue(user.is_admin)) return true;

    return false;
};