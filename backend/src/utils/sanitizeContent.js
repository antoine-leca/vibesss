const sanitizeHtml = require('sanitize-html');

function sanitizeContent(text) {
    if (!text) return '';

    return sanitizeHtml(text, {
        // 1. On autorise la balise 'img' aux côtés des paragraphes et du gras
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li', 'h1', 'h2', 'img'], 
        
        // 2. On restreint les attributs de l'image au strict minimum sain
        allowedAttributes: {
            'a': ['href'],
            'img': ['src', 'alt', 'title', 'class'] 
        },
        
        // 3. On autorise le format 'data' (indispensable pour les images en Base64 de Tiptap)
        allowedSchemes: ['http', 'https', 'mailto', 'data']
    });
}

module.exports = sanitizeContent;