'use strict';

const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');

class Authentication {
  constructor() {

    /** 
     * Get a new token
     */
    router.post('/token', AuthController.authenticate);

		return router;
  }
}

module.exports = Authentication;