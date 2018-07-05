'use strict';

const request      = require('request');
const config       = require('../config/app.config');
const utilities    = require("../helpers/utilities");
const jwt          = require("jsonwebtoken");
const _            = require('lodash');

class AuthController {

  constructor() {}

  /**
   * This Method allows to get a new token if the user license passed is valid  
   */
  authenticate(req, res) {
    let license = req.body.license;
    let email = req.body.email;
    let httpResponse = {
      status: false, 
      message: '',
      token: null,
      error: ''
    }

    if (license && email){

      //Make a request to fetch all clients from the web service
      request
      .get({ url: config.CLIENTS_SERVICE }, (error, response, body) => {

        //Handle error
        if (error) {
          httpResponse.error = 'Something went wrong in the server.';
          utilities.sendResponse(httpResponse, res);
          return;
        }

        //Get clients objects and filter one that matches with the license sent by the user
        let myResponse = JSON.parse(body).clients;
        let filteredClient = _.filter(myResponse, client => client.id === license && client.email === email);

        //Handle not license found
        if (!filteredClient.length) {
          httpResponse.message = 'Invalid license';
          utilities.sendResponse(httpResponse, res);
          return;
        }

        //Generate a new token and send a successful response
        httpResponse.token = jwt.sign(filteredClient[0], config.SECRET, { expiresIn: 600000*5 });
        httpResponse.message = 'New auth token provided successfully.';
        httpResponse.status = true;
        utilities.sendResponse(httpResponse, res);
      });
    } else {
      httpResponse.err = 'User license or email does not exist'; //Handle error
      utilities.sendResponse(httpResponse, res);
    }
  };
}

module.exports = new AuthController();
