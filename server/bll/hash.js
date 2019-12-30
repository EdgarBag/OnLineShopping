const crypto = require('crypto');

function hash(password) {
    const hashedPassword = crypto.createHash("sha1").update(password).digest('hex');
    return hashedPassword;

}

module.exports = hash;