import { Router } from 'express';
import { MakeListAllController, MakeListAwayController, MakeListHomeController } from '../controllers';

class LeaderBoarderRouter {
  public router: Router;

  private getAllList = new MakeListAllController()

  private getAwayList = new MakeListAwayController();

  private getHomeList = new MakeListHomeController()

  constructor() {
    this.router = Router();
    this.start();
  }

  start() {
    this.router.get('/', this.getAllList.handle);
    this.router.get('/home', this.getHomeList.handle);
    this.router.get('/away', this.getAwayList.handle);
  }
}

export default LeaderBoarderRouter;
