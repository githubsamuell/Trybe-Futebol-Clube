import { Router } from 'express';
import ControllerLeaderBoard from '../controllers/LeaderBoard/ControllerLeaderBoard';

class LeaderBoarderRouter {
  public router: Router;

  private leaderBoardController = new ControllerLeaderBoard();

  constructor() {
    this.router = Router();
    this.start();
  }

  start() {
    this.router.get('/', this.leaderBoardController.readAll);
    this.router.get('/home', this.leaderBoardController.readHome);
    this.router.get('/away', this.leaderBoardController.readAway);
  }
}

export default LeaderBoarderRouter;
