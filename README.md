# Backend

This application was generated with NodeJS 8.11.2.

## Install Dependencies

Run `npm install`

## Start the server up

Run `npm start`

## Start the server up for development

Run `nodemon`

## Running unit tests

Run `ng test`

## API Documentation

In order to pull information from any endpoint, it's needed generating an auth token,
by sending a client ID and email to the authentication endpoint. All routes are protected but the auth one.

You must send at the header request for all protected routes the auth token. For example *Authorization Bearer MY-TOKEN*

* **authenticate/api/token** - *Not Protected* - Used to get a new auth token.
  **It expects to recieve for example: Object { license: 'MY-LICENSE', email: 'MY-EMAIL' }**
* **clients/api/info/id** - *Protected* - Used to get user data filtered by user id.
  **It expects to recieve for example: Object { id: 'MY-USER-ID' }** 
* **clients/api/info/name** - *Protected* - Used to get user data filtered by user name.
  **It expects to recieve for example: Object { name: 'MY-USER-NAME' }** 
* **policies/api/info** - *Protected* - Used to get the list of policies linked to a user.
  **It expects to recieve for example: Object { id: 'MY-USER-ID' }**
* **policies/api/info/user** - *Protected* - Used to get the user linked to a policy number.
  **It expects to recieve for example: Object { policy: 'MY-POLICY-NUMBER' }**  