import { Request, Response } from 'express';
import IMatchReq from '../../interfaces/match/IMatchReq';
import StatusCode from '../../utils/statusCode';
import { SaveInProgressService } from '../../services';

class SaveInProgressController {

    private statusCode = StatusCode;

    private saveMatch = new SaveInProgressService()

    handle = async (req: Request, res: Response): Promise<Response> => {
        const datasaveMatch = req.body as unknown as IMatchReq;
        const saveMatch = await this.saveMatch.handle(datasaveMatch);
        if (datasaveMatch.awayTeam === datasaveMatch.homeTeam) {
          return res.status(this.statusCode.Unauthorized)
            .json({ message: 'It is not possible to create a match with two equal teams' });
        }
        if (saveMatch === null) {
          return res.status(this.statusCode.Unauthorized)
            .json({ message: 'There is no team with such id!' });
        }
        return res.status(this.statusCode.Created).json(saveMatch);
      };
}

export default SaveInProgressController;