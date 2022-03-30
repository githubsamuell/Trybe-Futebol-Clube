import { Router } from 'express';
import ClubController from '../controllers/Club';

class ClubRouter {
  public router: Router;

  private controllerClub = new ClubController();

  constructor() {
    this.router = Router();
    this.start();
  }

  start() {
    this.router.get('/:id', this.controllerClub.findOneClub);
    this.router.get('/', this.controllerClub.getAllClubs);
  }
}

export default ClubRouter;
