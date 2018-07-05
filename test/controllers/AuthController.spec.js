
const nock = require('nock');
const request = require('supertest')("http://localhost:3000/");

/**
 * Dev dependencies
 */
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Authentication Process', () => {

  it('Get new token - Route: /authenticate/api/token', (done) => {
    setTimeout(done, 60000);
		let body = {
      license: "a0ece5db-cd14-4f21-812f-966633e7be86",
      email: "britneyblankenship@quotezart.com",
    }
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiMTYzODE0LTNmNzUtNDMxMy1iZGUzLWNkZjU5ZTYxODkwMSIsIm5hbWUiOiJTaG9ydCIsImVtYWlsIjoic2hvcnRibGFua2Vuc2hpcEBxdW90ZXphcnQuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTMwNzQyNjg0LCJleHAiOjE1MzM3NDI2ODR9.weInEyPtN7SNQtdTwdXOHXBIm5xiq1k5tsebYNzA0m0";

    nock("http://localhost:3000")
      .post('/authenticate/api/token')
      .reply(200, {
        "status": 200,
        "message": "New auth token provided successfully.",
        "token": token
    });

    request
      .post('authenticate/api/token')
      .send(body)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.token).to.equal(token)
        done();
      });
  }).timeout(60000);
})