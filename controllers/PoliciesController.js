'use strict';

const request      = require('request');
const config       = require('../config/app.config');
const utilities    = require("../helpers/utilities");
const _            = require('lodash');

class PoliciesController {

  constructor() {}

  /**
   * Get the list of policies linked to a user
   */
  getPoliciesList(req, res) {
    let role = res.authToken.body.role;
    let content = req.body;
    let httpResponse = {
      status: false, 
      message: '',
      body: {},
      error: null
    }

    if (role === 'admin'){

      //Make a request to fetch all policies from the web service
      request
      .get({ url: config.POLICIES_SERVICE }, (error, response, body) => {

        //Handle error
        if (error) {
          httpResponse.error = 'Something went wrong in the request.';
          utilities.apiSendData(httpResponse, res);
          return;
        }

        //Get policies objects and filter one that matches with the id sent by the user
        let myResponse = JSON.parse(body).policies;
        let filteredPolicies = _.filter(myResponse, policy => policy.clientId === content.id);

        //Handle not policies found
        if (!filteredPolicies.length) {
          httpResponse.message = 'Invalid Client ID Provided';
          utilities.apiSendData(httpResponse, res);
          return;
        }

        httpResponse.body.policies = filteredPolicies;
        httpResponse.status = true;
        utilities.apiSendData(httpResponse, res);
      });

    } else {
      httpResponse.error = 'You are not authorized.';
      utilities.apiSendData(httpResponse, res);
    }
  };

  /**
   * Get the user linked to a policy number
   */
  getUserInfo(req, res) {
    let role = res.authToken.body.role;
    let content = req.body;
    let httpResponse = {
      status: false, 
      message: '',
      body: {},
      error: null
    }

    if (role === 'admin'){

      //Make a request to fetch all policies from the web service
      request
      .get({ url: config.POLICIES_SERVICE }, (error, response, body) => {

        //Handle error
        if (error) {
          httpResponse.error = 'Something went wrong in the request.';
          utilities.apiSendData(httpResponse, res);
          return;
        }

        //Get policies objects and filter one that matches with the id sent by the user
        let myResponse = JSON.parse(body).policies;
        let filteredPolicies = _.filter(myResponse, policy => policy.id === content.policy);

        //Handle not policies found
        if (!filteredPolicies.length) {
          httpResponse.message = 'Invalid Policy ID Provided';
          utilities.apiSendData(httpResponse, res);
          return;
        }

          //Make a request to fetch all clients from the web service
          request
          .get({ url: config.CLIENTS_SERVICE }, (error, response, body) => {

            //Handle error
            if (error) {
              httpResponse.error = 'Something went wrong in the request.';
              utilities.apiSendData(httpResponse, res);
              return;
            }

            //Get clients objects and filter one that matches with the client id
            let myResponse = JSON.parse(body).clients;
            let filteredClient = _.filter(myResponse, client => client.id === filteredPolicies[0].clientId);

            //Handle not policies found
            if (!filteredClient.length) {
              httpResponse.message = 'Client not found for that policy';
              utilities.apiSendData(httpResponse, res);
              return;
            }

            httpResponse.body.client = filteredClient[0];
            httpResponse.status = true;
            utilities.apiSendData(httpResponse, res);
          });
      });

    } else {
      httpResponse.error = 'You are not authorized.';
      utilities.apiSendData(httpResponse, res);
    }
  };
}

module.exports = new PoliciesController();
