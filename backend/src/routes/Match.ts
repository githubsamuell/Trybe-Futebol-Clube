import { Router } from 'express';
import ControllerMatch from '../controllers/Match/ControllerMatch';
import ValidateAuth from '../middlewares/validateAuth';

class MatchRouter {
  public router: Router;

  private matchController = new ControllerMatch();

  private validateAuth = new ValidateAuth();

  constructor() {
    this.router = Router();
    this.start();
  }

  start() {
    this.router.get('/', this.matchController.readByProgress);
    this.router.post('/', this.validateAuth.verifyToken, this.matchController.createMatch);
    this.router.patch('/:id', this.matchController.updateMatch);
    this.router.patch('/:id/finish', this.matchController.updateProgress);
  }
}

export default MatchRouter;
