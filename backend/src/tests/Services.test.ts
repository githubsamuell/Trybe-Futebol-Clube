import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
import User from "../database/modelsSequelize/user";
import IMatchReq from "../interfaces/match/IMatchReq";
import ServiceClub from "../services/Club/ServiceClub";
import ServiceUser from '../services/User/ServiceUser';
const { expect } = chai;

const login = {email: "s", password: "s"}

describe('Testa a classe ServiceClub', async () => {

  describe('Testa os metodos da classe ServiceClub', () => {
    
    const userClub = new ServiceClub();

    it('findOne club', async () => {
      expect(await userClub.findOne(1)).to.be.an("object");
    })

    it('Quando vem um usuario valido no request', async () => {
      expect(await userClub.getAll()).to.be.an('array');

    })
  })  
});

describe('Testa a classe ServiceUser', async () => {

  const userService = new ServiceUser()

  describe('Testa os metodos da classe ServiceUser', () => {
    
    it('findOne club', async () => {
      expect(await userService.findOneUser({email: "s", password: "s"})).to.be.an("object");
    })

    })
  })  
});
