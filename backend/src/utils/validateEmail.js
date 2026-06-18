function validateEmail(email) {
    if (typeof email !== 'string' || email.trim() === '') return false;

    // vérification du format juste le format : mail@mail.fr
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
}

module.exports = { validateEmail };
