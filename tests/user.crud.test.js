const path = require('path');
const mocha = require('mocha');

const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
const __root = path.resolve('./../');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');

dotenv.config({ path: `${__root}/.env.test` });
dotenv.load();
const app = require('../app');
const UserModel = require('../models/user');
const SessionModel = require('../models/session');

chai.use(chaiHttp);
const should = chai.should(); // eslint-disable-line no-unused-vars
const agent = chai.request.agent(app);
const userData = {
  username: 'test',
  password: 'test',
};
describe('CRUD /api/user', () => {
  /* Clear test database */
  before(async () => {
    const promises = [
      UserModel.model.remove(),
      SessionModel.remove(),
    ];
    try {
      await Promise.all(promises);
    } catch (err) {
      console.log(err);
    }
  });
  it('POST. Create new User', async () => {
    const res = await agent.post('/api/user').send(userData);
    res.statusCode.should.equal(201);
    res.body.should.have.any.keys('_id', 'username', 'token');
    res.body.username.should.equal(userData.username);
    userData.id = res.body._id;
    userData.token = res.body.token;
  });
  it('GET. Get User by Id', async () => {
    const res = await agent.get(`/api/user/${userData.id}`).set('x-access-token', userData.token);
    res.statusCode.should.equal(200);
    res.body.should.have.any.keys('_id', 'username');
    res.body._id.should.equal(userData.id);
    res.body.username.should.equal(userData.username);
  });
  it('PATCH. Update Use', async () => {
    const res = await agent
      .patch(`/api/user/${userData.id}`, { testFields: 'testValue', email: 'email@mail.com' })
      .set('x-access-token', userData.token);
    res.statusCode.should.equal(200);
    res.statusCode.should.equal(200);
    res.body._id.should.equal(userData.id);
    res.body.username.should.equal(userData.username);
    res.body.should.not.include({ testFields: 'testValue' });
  });
  it('DELETE. should return OK', async () => {
    const res = await agent.delete(`/api/user/${userData.id}`).set('x-access-token', userData.token);
    res.body.ok.should.equal(1);
    const resultDeleted = await UserModel.model.findOneWithDeleted({ _id: userData.id });
    resultDeleted.deleted.should.equal(true);
    try {
      await agent.get(`/api/user/${userData.id}`).set('x-access-token', userData.token);
      chai.assert(0 === 1, 'Error');
    } catch (err) {
      err.status.should.equal(404);
    }
  });
});
