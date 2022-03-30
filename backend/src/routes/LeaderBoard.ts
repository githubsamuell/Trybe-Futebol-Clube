import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard';

class LeaderBoarderRouter {
  public router: Router;

  private leaderController = new LeaderBoardController();

  constructor() {
    this.router = Router();
    this.start();
  }

  start() {
    this.router.get('/', this.leaderController.leaderBoarderList);
    this.router.get('/home', this.leaderController.leaderBoarderListHome);
    this.router.get('/away', this.leaderController.leaderBoarderListAway);
  }
}

export default LeaderBoarderRouter;
