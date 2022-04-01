import { Request, Response } from 'express';
import FindOneClubService from '../../services/Club/FindOneClub';
import StatusCode from '../../utils/statusCode';

class FindOneClubController {

    private clubService = new FindOneClubService()

    private statusCode = StatusCode;

    handle = async (req:Request, res: Response) => {
        const id = Number(req.params.id);
        const club = await this.clubService.handle(id);
        if (club === null) {
          return res.status(this.statusCode.NotFound)
            .json({ message: 'club nao encontrado' });
        }
    
        return res.status(this.statusCode.Ok).json(club);
      };
}

export default FindOneClubController;