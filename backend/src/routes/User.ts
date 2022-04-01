import { Router } from 'express';
import { FindUserController, VerifyAuthController } from '../controllers';
import VerifyValidFields from '../middlewares/userMiddleware';
import ValidateAuth from '../middlewares/validateAuth';

class LoginRouter {
  public router: Router;

  private findUserController = new FindUserController();

  private verifyAuth = new VerifyAuthController()

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
      this.verifyAuth.handle,
    );
    this.router.post('/', this.validateFields.verifyRequest, this.findUserController.handle);
  }
}

export default LoginRouter;
