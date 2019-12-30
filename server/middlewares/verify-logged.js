const jwt = require('jsonwebtoken');

function veryfyLoggedIn(request, response, next) {

    if (!request.headers.authorization) {
        return response.status(401).send('Unauthorized request')
    }
    const token = request.headers.authorization.split(' ')[1];

    //if the token not exist
    if (!token) {
        response.status(401).send('You are not logged-in!');
        return;
    }

    //IF token illigal or expired:
    jwt.verify(token, 'super', err => {
        if (err) {
            response.status(401).send('You are not logged-in!');
            return;
        }
        next();
    });
}

module.exports = veryfyLoggedIn;