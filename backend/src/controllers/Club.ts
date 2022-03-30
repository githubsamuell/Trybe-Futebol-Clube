import { Request, Response } from 'express';
import ClubService from '../services/Club';
import StatusCode from '../utils/statusCode';

class ClubController {
  private clubService = new ClubService();

  private statusCode = StatusCode;

  getAllClubs = async (req: Request, res: Response) => {
    const clubs = await this.clubService.getAllClubs();

    return res.status(this.statusCode.Ok).json(clubs);
  };

  findOneClub = async (req:Request, res: Response) => {
    const id = Number(req.params.id);
    const club = await this.clubService.findOneClub(id);
    if (club === null) {
      return res.status(this.statusCode.NotFound)
        .json({ message: 'club nao encontrado' });
    }

    return res.status(this.statusCode.Ok).json(club);
  };
}

export default ClubController;
