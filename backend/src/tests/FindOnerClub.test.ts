/* import {FindOneClubService} from '../services'

const { expect } = chai;

const login = {email: "s", password: "s"}

describe('Testa a classe FindOneClubService', async () => {

  describe('Testa o metodo findUser', () => {
    
    const loginService = new FindOneClubService();

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
 */