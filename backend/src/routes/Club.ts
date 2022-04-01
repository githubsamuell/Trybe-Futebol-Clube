import { Router } from 'express';
import { FindOneClubController, GetAllClubController } from '../controllers';
import ClubController from '../controllers/Club/GetAllClub';

class ClubRouter {
  public router: Router;

  private findOneControllerClub = new FindOneClubController();

  private getAllControllerClub = new GetAllClubController()

  constructor() {
    this.router = Router();
    this.start();
  }

  start() {
    this.router.get('/:id', this.findOneControllerClub.handle);
    this.router.get('/', this.getAllControllerClub.handle);
  }
}

export default ClubRouter;
