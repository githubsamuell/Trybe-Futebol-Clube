import { Request, Response } from 'express';
import IMatchReq from '../../interfaces/match/IMatchReq';
import StatusCode from '../../utils/statusCode';
import ServiceMatch from '../../services/Match/ServiceMatch';
import IUpdateGoalsReq from '../../interfaces/match/IUpdateGoals';
import IQuery from '../../interfaces/express/IQuery';

class ControllerMatch {
  private statusCode = StatusCode;

  constructor(private serviceMatch = new ServiceMatch()) {}

  createMatch = async (req: Request, res: Response): Promise<Response> => {
    const datasaveMatch = req.body as unknown as IMatchReq;
    if (datasaveMatch.awayTeam === datasaveMatch.homeTeam) {
      return res.status(this.statusCode.Unauthorized)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const saveMatch = await this.serviceMatch.saveGame(datasaveMatch);
    if (saveMatch === null) {
      return res.status(this.statusCode.Unauthorized)
        .json({ message: 'There is no team with such id!' });
    }

    return res.status(this.statusCode.Created).json(saveMatch);
  };

  updateMatch = async (req: Request, res: Response): Promise<Response> => {
    const goalsMatch = req.body as unknown as IUpdateGoalsReq;
    const id = Number(req.params.id);
    const saveProgressMatch = await this.serviceMatch.updateMatch(id, goalsMatch);
    if (typeof saveProgressMatch === null) {
      return res.status(this.statusCode.Unauthorized).json({ message: 'Match is not in progress' });
    }
    return res.status(200).json({ message: 'The result was updated' });
  };

  readByProgress = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query as unknown as IQuery;
    let booleanQuery: boolean | undefined;

    if (inProgress && inProgress.toString() === 'false') {
      booleanQuery = false;
    }

    if (inProgress && inProgress.toString() === 'true') {
      booleanQuery = true;
    }

    const matchs = await this.serviceMatch.getMatchByProgress(booleanQuery);
    return res.status(this.statusCode.Ok).json(matchs);
  };

  updateProgress = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.serviceMatch.finishMatch(Number(id));
    return res.status(200).json('Match was update');
  };
}

export default ControllerMatch;
