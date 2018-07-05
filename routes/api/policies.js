'use strict';

const express = require('express');
const router = express.Router();
const PoliciesController = require('../../controllers/PoliciesController');
const Authenticate = require('../../helpers/jwtverify');

class Policies {
  constructor() {

    /** 
     * Get the list of policies linked to a user name
     */
		router.post('/info', Authenticate.authorization, function(req, res, next){
      if (res.authToken.status && req.body.id) {
        PoliciesController.getPoliciesList(req, res);
      } else {
        res.status(200).json({
				  'status': false, 
				  'error': 'You are not authorized or User ID does not exist.'
			  });
      }
    });

    /** 
     * Get the user linked to a policy number
     */
		router.post('/info/user', Authenticate.authorization, function(req, res, next){
      if (res.authToken.status && req.body.policy) {
        PoliciesController.getUserInfo(req, res);
      } else {
        res.status(200).json({
				'status': false, 
				'error': 'You are not authorized or Policy ID does not exist.'
			  });
      }
    });

		return router;
  }
}

module.exports = Policies;