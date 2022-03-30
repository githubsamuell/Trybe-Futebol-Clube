import { Request, Response } from 'express';
import IQuery from '../interfaces/express/IQuery';
import IMatchReq from '../interfaces/match/IMatchReq';
/* import IMatchReq from '../interfaces/match/IMatchReq'; */
import IUpdateGoalsReq from '../interfaces/match/IUpdateGoals';
import MatchService from '../services/Match';
import StatusCode from '../utils/statusCode';

class MatchController {
  private matchService = new MatchService();

  private statusCode = StatusCode;

  getMatchsByProgress = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query as unknown as IQuery;
    let booleanQuery: boolean | undefined;

    if (inProgress && inProgress.toString() === 'false') {
      booleanQuery = false;
    }

    if (inProgress && inProgress.toString() === 'true') {
      booleanQuery = true;
    }

    const matchs = await this.matchService.getMatchsByProgress(booleanQuery);
    return res.status(this.statusCode.Ok).json(matchs);
  };

  saveMatchInProgress = async (req: Request, res: Response): Promise<Response> => {
    const datasaveMatch = req.body as unknown as IMatchReq;
    const saveMatch = await this.matchService.saveMatchInProgress(datasaveMatch);
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

  updateResultsMatch = async (req: Request, res: Response): Promise<Response> => {
    const goalsMatch = req.body as unknown as IUpdateGoalsReq;
    const id = Number(req.params.id);
    const saveProgressMatch = await this.matchService.updateResultsMatch(id, goalsMatch);
    if (typeof saveProgressMatch === null) {
      return res.status(this.statusCode.Unauthorized).json({ message: 'Match is not in progress' });
    }
    return res.status(200).json({ message: 'The result was updated' });
  };

  finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    return res.status(200).json('Match was update');
  };
}

export default MatchController;
