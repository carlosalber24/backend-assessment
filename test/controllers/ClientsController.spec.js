
const nock = require('nock');
const request = require('supertest')("http://localhost:3000/");

/**
 * Dev dependencies
 */
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Clients service', () => {

  it('Get user data filtered by user id - Route: /clients/api/info/id', (done) => {
    setTimeout(done, 60000);
		let body = {
      id: "a0ece5db-cd14-4f21-812f-966633e7be86"
    }

    let responseBody = {
      id: "a0ece5db-cd14-4f21-812f-966633e7be86",
      name: "Britney",
      email: "britneyblankenship@quotezart.com",
      role: "admin"
    }

    nock("http://localhost:3000")
      .post('/clients/api/info/id')
      .reply(200, {
        status: 200,
        message: "",
        data: responseBody,
        error: null
    });

    request
      .post('clients/api/info/id')
      .send(body)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.deep.equal(responseBody)
        done();
      });
  }).timeout(60000);

  it('Get user data filtered by user name - Route: /clients/api/info/name', (done) => {
    setTimeout(done, 60000);
		let body = {
      name: "Britney"
    }

    let responseBody = {
      id: "a0ece5db-cd14-4f21-812f-966633e7be86",
      name: "Britney",
      email: "britneyblankenship@quotezart.com",
      role: "admin"
    }

    nock("http://localhost:3000")
      .post('/clients/api/info/name')
      .reply(200, {
        status: 200,
        message: "",
        data: responseBody,
        error: null
    });

    request
      .post('clients/api/info/name')
      .send(body)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.deep.equal(responseBody)
        done();
      });
  }).timeout(60000);
})