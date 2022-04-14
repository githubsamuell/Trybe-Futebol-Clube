/* import LoginUserService from "../services/UserLogin";
import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
import bcrypt = require('bcryptjs');
import User from "../database/modelsSequelize/user";
import MatchService from "../services/Match";
import ClubService from "../services/Club";
import IMatchReq from "../interfaces/match/IMatchReq";
import LeaderBoardService from "../services/LeaderBoard";
const { expect } = chai;

const login = {email: "s", password: "s"}

describe('Testa a classe LoginUserService', async () => {

  describe('Testa o metodo findUser', () => {
    
    const loginService = new LoginUserService();

    it('Quando vem um usuario invalido no request', async () => {
      expect(await loginService.findUser({password: 'a', email: 'b'})).to.be.null;
    })

    it('Quando vem um usuario valido no request', async () => {
      expect(await loginService.findUser({password: 'secret_admin', email: 'admin@admin.com'}))
      .to.be.an('object');

      expect(await loginService.findUser({password: 'secret_admin', email: 'admin@admin.com'}))
      .to.have.keys(['id', 'username', 'role', 'email']);
    })
  })  
}); 

describe('Testa a classe MatchService', async () => {
  const matchService = new MatchService();

  describe('Testa o metodo getMatchsByProgress', () => {
    
    

    it('Quando tem parametro boolean', async () => {
      expect(await matchService.getMatchsByProgress(true)).to.be.an('array');
      expect(await matchService.getMatchsByProgress(true)).to.have.length.greaterThan(1);

    })

    it('Quando tem parametro undefined', async () => {
      expect(await matchService.getMatchsByProgress(true)).to.be.an('array');
      expect(await matchService.getMatchsByProgress(true)).to.have.length.greaterThan(1);

    })

  })
  
  describe('Testa o metodo saveMatchInprogress', () => {
    const infoF: IMatchReq = {
      homeTeam: 0,
      awayTeam: 2,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true
    }

    const infoT: IMatchReq = {
      homeTeam: 1,
      awayTeam: 2,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true
    }

    it('Quando vem um time com id inexistente', async () => {
      expect(await matchService.saveMatchInProgress(infoF)).to.be.null;
    })
    it('Quando os dois times existem', async () => {
      expect(await matchService.saveMatchInProgress(infoT)).to.be.an('object');
    })

  })

  describe('Testa o metodo updateResultMatchs', () => {
    const infoT = {
      homeTeamGoals: 0,
      awayTeamGoals: 0,
    }

    it('Quando a partida foi atualizada', async () => {
      expect(await matchService.updateResultsMatch(10, infoT)).to.be.null;
    })

    it('Quando nao encontra a partida', async () => {
      expect(await matchService.updateResultsMatch(1000, infoT)).to.be.null;
    })

  })
  describe('Testa o metodo finishMatch', () => {
  
    it('Finaliza a partida', async () => {
      expect(await matchService.finishMatch(1)).to.be.a('string');
    })

  })
});

describe('Testa a classe clubService', async () => {
  const clubService = new ClubService();

  describe('Testa o metodo getAllClubs', () => {
    
    

    it('Quando o metodo é chamado', async () => {
      expect(await clubService.getAllClubs()).to.be.an('array');

    })


  })
  
  describe('Testa o metodo findOneClub', () => {

    it('Quando o time existe', async () => {
      expect(await clubService.findOneClub(1)).to.be.an('object');
    })
    it('Quando o time nao existe', async () => {
      expect(await clubService.findOneClub(0)).to.be.null;
    })

  })

});

describe('Testa a classe LeaderBoardService', async () => {
  const leaderBoardService = new LeaderBoardService();
  describe('Testa o metodo getAll', () => {
    
    

    it('Quando o metodo é chamado', async () => {
      expect(await leaderBoardService.getAll()).to.be.an('array');

    })


  })
  

});

  
 */