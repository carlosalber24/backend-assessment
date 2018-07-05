'use strict';

const authenticationApi = require('./api/authentication');
const clientsApi = require('./api/clients');
const policiesApi = require('./api/policies');

module.exports = (app) => {

  /** 
   * Routes for oAuth2 requests. Call to Authentication Api Service
   */
  app.use('/authenticate/api', new authenticationApi());

  /** 
   * Routes for clients requests. Call to Clients Api Service
   */
  app.use('/clients/api', new clientsApi());

  /** 
   * Routes for policies requests. Call to Policies Api Service
   */
  app.use('/policies/api', new policiesApi());

  /** 
   * Redirect to Index Layout Page
   */
  app.use('*', (req, res) => {
    res.render('index', { title: 'Hello welcome to this app' });
  });
}