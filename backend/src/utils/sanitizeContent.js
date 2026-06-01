const sanitizeHtml = require('sanitize-html');

function sanitizeContent(text) {
    // Sécurité : si ce n'est pas du texte, on renvoie une chaîne vide
    if (typeof text !== 'string') {
        return '';
    }

    // Configuration pour autoriser la mise en forme basique des articles de la plateforme
    return sanitizeHtml(text, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li'],
        allowedAttributes: {
            'a': ['href']
        },
        // On bloque les liens dangereux qui exécutent du code (javascript:)
        allowedSchemes: ['http', 'https', 'mailto'] 
    });
}

module.exports = sanitizeContent;