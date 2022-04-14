import { Router } from 'express';
import VerifyAuthController from '../controllers/User/VerifyControllerAuth';
import ControllerUser from '../controllers/User/ControllerUser';
import VerifyValidFields from '../middlewares/userMiddleware';
import ValidateAuth from '../middlewares/validateAuth';

class LoginRouter {
  public router: Router;

  private userController = new ControllerUser();

  private verifyAuth = new VerifyAuthController();

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
    this.router.post('/', this.validateFields.verifyRequest, this.userController.readOne);
  }
}

export default LoginRouter;
