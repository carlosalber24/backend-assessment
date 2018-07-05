var jwt         = require('jsonwebtoken');
var config      = require('../config/app.config');

class Auth {
    constructor() {}

    authorization(req, res, next) {
			if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
				var token = req.headers.authorization.split(' ')[1];
				if (token) {

          //Verify if the token is a valid one
					jwt.verify(token, config.SECRET, function(err, decoded) {

            //Handle error
						if (err) {
							res.authToken = {
                status: false,
                body: {},
                err: 'Something went wrong during token verification' 
							}; 
							return next();
						} else {
              //Return a new object with the info extracted from the token
							res.authToken = { 
                status: true, 
                body: {
                  id: decoded.id, 
                  email: decoded.email,
                  name: decoded.name,
                  role: decoded.role
                }
							}; 
							return next();
						}
					});
				} else {
					res.authToken = { status: false , body: {}, err: 'Token does not exist' }; //Handle error
					return next();
				}
		} else{
			res.authToken = { status: false , body: {}, err: 'No authorization headers' }; //Handle error
			return next();
		}
	}
}


module.exports = new Auth();