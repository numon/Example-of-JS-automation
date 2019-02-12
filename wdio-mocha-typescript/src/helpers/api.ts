import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as request from 'superagent';

chai.use(chaiHttp);

export default class API {

  public test(): request.Request {
    return chai.request('https://swapi.co/api/planets/1').get('/');
  }
}
