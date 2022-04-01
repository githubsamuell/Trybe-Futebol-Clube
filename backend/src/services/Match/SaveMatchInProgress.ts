import { IMatchReq } from '../../interfaces/match';
import Club from '../../database/modelsSequelize/club';
import Match from '../../database/modelsSequelize/match';

class SaveInProgressService {

    private clubEntity = Club;

    private matchEntity = Match

    async handle(match: IMatchReq) {
        const homeTeam = await this.clubEntity.findOne({ where: { id: match.homeTeam } });
        const awayTeam = await this.clubEntity.findOne({ where: { id: match.awayTeam } });
        if (!homeTeam || !awayTeam) return null;
        const saveProgressMatch = await this.matchEntity.create(match);
    
        return saveProgressMatch;
      }
}

export default SaveInProgressService;