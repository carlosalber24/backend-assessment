'use strict';

const request      = require('request');
const config       = require('../config/app.config');
const utilities    = require("../helpers/utilities");
const _            = require('lodash');

class ClientsController {

  constructor() {}

  /**
   * Allows to get the user information if an id or name is passed
   */
  getClientInformation(req, res) {
    let role = res.authToken.body.role;
    let content = req.body;
    let httpResponse = {
      status: false, 
      message: '',
      body: {},
      error: null
    }

    if (role === 'admin' || role === 'user'){

      //Make a request to fetch all clients from the web service
      request
      .get({ url: config.CLIENTS_SERVICE }, (error, response, body) => {

        //Handle error
        if (error) {
          httpResponse.error = 'Something went wrong in the server.';
          utilities.apiSendData(httpResponse, res);
          return;
        }

        //Get clients objects and filter one that matches with the id sent by the user
        let myResponse = JSON.parse(body).clients;
        let filteredClient = _.filter(myResponse, client => client.id === content.id || client.name === content.name);

        //Handle not license found
        if (!filteredClient.length) {
          httpResponse.message = 'Invalid ID';
          utilities.apiSendData(httpResponse, res);
          return;
        }

        httpResponse.body = filteredClient[0];
        httpResponse.status = true;
        utilities.apiSendData(httpResponse, res);
      });

    } else {
      httpResponse.error = 'You are not authorized.';
      utilities.apiSendData(httpResponse, res);
    }
  };
}

module.exports = new ClientsController();
