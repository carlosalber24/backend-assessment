'use strict';

const express = require('express');
const router = express.Router();
const ClientsController = require('../../controllers/ClientsController');
const Authenticate = require('../../helpers/jwtverify');

class Clients {
  constructor() {

    /** 
     * Get user data filtered by user id
     */
		router.post('/info/id', Authenticate.authorization, function(req, res, next){
      if (res.authToken.status && req.body.id) {
        ClientsController.getClientInformation(req, res);
      } else {
        res.status(200).json({
				  'status': false, 
				  'error': 'You are not authorized or User ID does not exist.'
			  });
      }
    });

    /** 
     * Get user data filtered by user user name
     */
		router.post('/info/name', Authenticate.authorization, function(req, res, next){
      if (res.authToken.status && req.body.name) {
        ClientsController.getClientInformation(req, res);
      } else {
        res.status(200).json({
				'status': false, 
				'error': 'You are not authorized or User Name does not exist.'
			  });
      }
    });

		return router;
  }
}

module.exports = Clients;