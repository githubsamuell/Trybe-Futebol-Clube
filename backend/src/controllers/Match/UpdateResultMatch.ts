import { Request, Response } from 'express';
import UpdateMatchService from '../../services/Match/UpdateMatchsResults';
/* import IMatchReq from '../interfaces/match/IMatchReq'; */
import IUpdateGoalsReq from '../../interfaces/match/IUpdateGoals';
import StatusCode from '../../utils/statusCode';

class UpdateResultController {
  private matchService = new UpdateMatchService();

  private statusCode = StatusCode;

  handle = async (req: Request, res: Response): Promise<Response> => {
    const goalsMatch = req.body as unknown as IUpdateGoalsReq;
    const id = Number(req.params.id);
    const saveProgressMatch = await this.matchService.handle(id, goalsMatch);
    if (typeof saveProgressMatch === null) {
      return res.status(this.statusCode.Unauthorized).json({ message: 'Match is not in progress' });
    }
    return res.status(200).json({ message: 'The result was updated' });
  };
}

export default UpdateResultController;