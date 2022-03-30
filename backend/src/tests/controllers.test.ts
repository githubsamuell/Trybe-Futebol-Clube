import { app } from "../app";
import IMatchReq from "../interfaces/match/IMatchReq";
import chaiHttp = require('chai-http');
import * as chai from 'chai';
import LoginUserController from "../controllers/User";
import * as bcrypt from 'bcryptjs';
import Sinon = require("sinon");

chai.use(chaiHttp);
const { expect } = chai;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjQ3ODk1NzY4LCJleHAiOjE2NDg1MDA1Njh9.op-ZUbbRwCzO_-Oy1lS3HJ1AfYtxrZyT5MLx9ikXLKU"

Sinon.stub(bcrypt, 'compare').resolves(true);
describe('Testa a rota de LoginUserController', () => {
    it('testa o retorno com um request invalido', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: 'samuel@samuel.com',
            password: '6789456454'
        });


        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse).to.be.an('Object');
    
      });

      it('testa o retorno com um request valido', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: 'admin@admin.com',
            password: 'secret_admin'
        });


        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(await chaiHttpResponse.body).to.be.an('object');
    
      });
})

describe('Testa a classe ClubController', () => {
    
    it('testa o resultado quando usuario busca por um time que nao existe', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/0').set('content-type', 'application/json');
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(await chaiHttpResponse.body).to.be.eqls({ message: 'club nao encontrado' });
  
    });

    it('testa o resultado quando usuario busca por um time valido', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/1').set('content-type', 'application/json');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(await chaiHttpResponse.body).to.be.an('object');
  
    });
})

describe('Testa a classe matchController', () => {
    
  const mockData = {
    homeTeam: 0,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true
  } as unknown as IMatchReq;

  const mockDataeq = {
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 2,
    inProgress: true
  } as unknown as IMatchReq;

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjQ3ODk1NzY4LCJleHAiOjE2NDg1MDA1Njh9.op-ZUbbRwCzO_-Oy1lS3HJ1AfYtxrZyT5MLx9ikXLKU"

  it('testa o resultado quando usuario tenta salvar uma partida com time que nao existe', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/matchs').set({ Authorization: token })
    .send(mockData);
    expect(chaiHttpResponse.status).to.be.equal(401);


  });

  it('testa o resultado quando usuario tenta salvar uma partida com times iguais', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/matchs').set({ Authorization: token })
    .send(mockDataeq);
    expect(chaiHttpResponse.status).to.be.equal(401);


  });
})

describe('Testa a classe LoginUserController', () => {
  
    it('testa o retorno com um request valido', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
      });
  
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse).to.be.an('Object');
  
    });
  
    it('testa a permissao de um usuario nao autenticado', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate').set({ Authorization: '12345' })
      .set('content-type', 'application/json')
      .send({
          email: 'admin@admin',
          password: 'secret_admin'
      });
  
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.eqls({message: 'usuario nao authenticado'});
  
    });
  
  })
  
  describe('Testa a classe ClubController', () => {
      
    it('testa o resultado quando usuario busca por todos os times', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
        .set('content-type', 'application/json');
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse).to.be.an('object');
    
      });
  
      it('testa o resultado quando usuario busca por um time', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1').set('content-type', 'application/json');
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse).to.be.an('object');
        expect(chaiHttpResponse.body).to.have.keys('id', 'clubName');
    
      });
  })
  

describe('Testa a classe LeaderBoarderController', () => {
      
    it('testa o resultado quando usuario busca por todos os jogos sem filtro', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderBoard')
        .set('content-type', 'application/json');
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.an('array');
    
      });
  
      it('testa o resultado quando usuario busca por todos os jogos em casa', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderBoard/home')
        .set('content-type', 'application/json');
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.an('array');
    
      });

      it('testa o resultado quando usuario busca por todos os jogos fora', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderBoard/away')
        .set('content-type', 'application/json');
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.an('array');
    
      });
  })
  
