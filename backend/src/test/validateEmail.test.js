const { validateEmail } = require('../utils/validateEmail');

describe('Fonction Backend : validateEmail (Validation de format)', () => {

    describe('Emails valides (formats standards)', () => {
        test('Accepte un email simple classique', () => {
            expect(validateEmail('user@example.com')).toBe(true);
        });

        test('Accepte un email avec un sous-domaine', () => {
            expect(validateEmail('user@mail.example.com')).toBe(true);
        });

        test('Accepte un email avec un TLD long (.museum, .academy, etc.)', () => {
            expect(validateEmail('contact@universite.academy')).toBe(true);
        });

        test('Accepte un email avec des chiffres dans la partie locale', () => {
            expect(validateEmail('user123@example.com')).toBe(true);
        });

        test('Accepte un email avec un point dans la partie locale', () => {
            expect(validateEmail('prenom.nom@example.com')).toBe(true);
        });

        test('Accepte un email avec un tiret dans la partie locale', () => {
            expect(validateEmail('prenom-nom@example.com')).toBe(true);
        });

        test('Accepte un email avec un underscore dans la partie locale', () => {
            expect(validateEmail('prenom_nom@example.com')).toBe(true);
        });

        test('Accepte un email avec le signe + (alias Gmail)', () => {
            expect(validateEmail('user+tag@gmail.com')).toBe(true);
        });

        test('Accepte un TLD de type pays (.fr, .uk, .de)', () => {
            expect(validateEmail('user@example.fr')).toBe(true);
        });

        test('Accepte un email avec des majuscules', () => {
            expect(validateEmail('User@Example.COM')).toBe(true);
        });
    });

    describe('Emails invalides (structure incorrecte)', () => {
        test('Rejette une chaîne sans @', () => {
            expect(validateEmail('pasunemail')).toBe(false);
        });

        test('Rejette un email sans partie locale (commence par @)', () => {
            expect(validateEmail('@example.com')).toBe(false);
        });

        test('Rejette un email sans domaine (finit par @)', () => {
            expect(validateEmail('user@')).toBe(false);
        });

        test('Rejette un email sans TLD (pas de point dans le domaine)', () => {
            expect(validateEmail('user@domaine')).toBe(false);
        });

        test('Rejette un email avec un TLD d\'un seul caractère', () => {
            expect(validateEmail('user@example.c')).toBe(false);
        });

        test('Rejette un email avec un point final dans le domaine', () => {
            expect(validateEmail('user@example.')).toBe(false);
        });

        test('Rejette un email avec deux @ consécutifs', () => {
            expect(validateEmail('user@@example.com')).toBe(false);
        });

        test('Rejette un email avec un espace au milieu', () => {
            expect(validateEmail('user @example.com')).toBe(false);
        });
    });

    describe('Gestion des valeurs limites et des erreurs de type', () => {
        test('Retourne false si l\'entrée est null', () => {
            expect(validateEmail(null)).toBe(false);
        });

        test('Retourne false si l\'entrée est undefined', () => {
            expect(validateEmail(undefined)).toBe(false);
        });

        test('Retourne false si l\'entrée est un nombre', () => {
            expect(validateEmail(42)).toBe(false);
        });

        test('Retourne false si l\'entrée est un tableau', () => {
            expect(validateEmail(['user@example.com'])).toBe(false);
        });

        test('Retourne false si l\'entrée est une chaîne vide', () => {
            expect(validateEmail('')).toBe(false);
        });

        test('Retourne false si l\'entrée est une chaîne d\'espaces', () => {
            expect(validateEmail('   ')).toBe(false);
        });
    });

});
