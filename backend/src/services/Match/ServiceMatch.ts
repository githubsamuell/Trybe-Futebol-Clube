import { IMatchReq } from '../../interfaces/match';
import Club from '../../database/modelsSequelize/club';
import Match from '../../database/modelsSequelize/match';
import GetMatchsProgService from './GetMatchsByProgress';

class ServiceMatch extends Match {
  constructor(private clubEntity = Club) {
    super();
  }

  public getByProgress = new GetMatchsProgService();

  async saveGame(match: IMatchReq) {
    const homeTeam = await this.clubEntity.findOne({ where: { id: match.homeTeam } });
    const awayTeam = await this.clubEntity.findOne({ where: { id: match.awayTeam } });
    if (!homeTeam || !awayTeam) return null;
    const newMatch = await this.saveMatch(match);

    return newMatch;
  }

  getMatchByProgress = async (inProgress: boolean | undefined) =>
    this.getByProgress.handle(inProgress);
}

export default ServiceMatch;
