import { Request, Response } from 'express';
import { GetAllClubsService } from '../../services';
import ClubService from '../../services/Club/FindOneClub';
import StatusCode from '../../utils/statusCode';

class GetAllClubController {
  private clubService = new GetAllClubsService();

  private statusCode = StatusCode;

  handle = async (req: Request, res: Response) => {
    const clubs = await this.clubService.handle();

    return res.status(this.statusCode.Ok).json(clubs);
  };


}

export default GetAllClubController;
