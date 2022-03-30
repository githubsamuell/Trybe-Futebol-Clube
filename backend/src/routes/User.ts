import { Router } from 'express';
import LoginUserController from '../controllers/User';
import VerifyValidFields from '../middlewares/userMiddleware';
import ValidateAuth from '../middlewares/validateAuth';

class LoginRouter {
  public router: Router;

  private loginController = new LoginUserController();

  private validateFields = new VerifyValidFields();

  private validateAuth = new ValidateAuth();

  constructor() {
    this.router = Router();
    this.start();
  }

  private start() {
    this.router.get(
      '/validate',
      this.validateAuth.verifyToken,
      this.loginController.verifyControllerAuth,
    );
    this.router.post('/', this.validateFields.verifyRequest, this.loginController.findUser);
  }
}

export default LoginRouter;
