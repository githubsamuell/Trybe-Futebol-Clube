import { Router } from 'express';
import { FinishMatchController, GetByProgressController, SaveInProgressController, UpdateMatchController } from '../controllers';
import MatchController from '../controllers/Match/FinishMatchController';
import ValidateAuth from '../middlewares/validateAuth';

class MatchRouter {
  public router: Router;

  private saveMatch = new SaveInProgressController()

  private updateResults = new UpdateMatchController()

  private finishMatch = new FinishMatchController()

  private validateAuth = new ValidateAuth();

  private getMatch = new GetByProgressController()

  constructor() {
    this.router = Router();
    this.start();
  }

  start() {
    this.router.get('/', this.getMatch.handle);
    this.router.post('/', this.validateAuth.verifyToken, this.saveMatch.handle);
    this.router.patch('/:id', this.updateResults.handle);
    this.router.patch('/:id/finish', this.finishMatch.handle);
  }
}

export default MatchRouter;
