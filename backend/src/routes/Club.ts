import { Router } from 'express';
import ControllerClub from '../controllers/Club/ControllerClub';

class ClubRouter {
  public router: Router;

  private clubController = new ControllerClub();

  constructor() {
    this.router = Router();
    this.start();
  }

  start() {
    this.router.get('/', this.clubController.read);
    this.router.get('/:id', this.clubController.readOne);
  }
}

export default ClubRouter;
