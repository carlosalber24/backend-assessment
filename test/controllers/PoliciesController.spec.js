
const nock = require('nock');
const request = require('supertest')("http://localhost:3000/");

/**
 * Dev dependencies
 */
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const policies = [{
  id: "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
  amountInsured: 399.89,
  email: "inesblankenship@quotezart.com",
  inceptionDate: "2015-07-06T06:55:49Z",
  installmentPayment: true,
  clientId: "a0ece5db-cd14-4f21-812f-966633e7be86"
},
{
  id: "6f514ec4-1726-4628-974d-20afe4da130c",
  amountInsured: 697.04,
  email: "inesblankenship@quotezart.com",
  inceptionDate: "2014-09-12T12:10:23Z",
  installmentPayment: false,
  clientId: "a0ece5db-cd14-4f21-812f-966633e7be86"
}];

const client = {
  id: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
  name: "Manning",
  email: "manningblankenship@quotezart.com",
  role: "admin"
};

describe('Policies service', () => {

  it('Get the list of policies linked to a user name - Route: /policies/api/info', (done) => {
    setTimeout(done, 60000);
		let body = {
      id: "a0ece5db-cd14-4f21-812f-966633e7be86"
    }

    nock("http://localhost:3000")
      .post('/policies/api/info')
      .reply(200, {
        status: 200,
        message: "",
        data: { policies: policies },
        error: null
    });

    request
      .post('policies/api/info')
      .send(body)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.data.policies).to.deep.equal(policies)
        done();
      });
  }).timeout(60000);

  it('Get the user linked to a policy number - Route: /policies/api/info/user', (done) => {
    setTimeout(done, 60000);
		let body = {
      policy: "64cceef9-3a01-49ae-a23b-3761b604800b"
    }

    nock("http://localhost:3000")
      .post('/policies/api/info/user')
      .reply(200, {
        status: 200,
        message: "",
        data: { client: client },
        error: null
    });

    request
      .post('policies/api/info/user')
      .send(body)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.data.client).to.deep.equal(client)
        done();
      });
  }).timeout(60000);
})