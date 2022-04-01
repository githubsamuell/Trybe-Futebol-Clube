import IUpdateGoalsReq from '../../interfaces/match/IUpdateGoals';
import Match from '../../database/modelsSequelize/match';

class UpdateMatchService {
    
    private matchEntity = Match

    async handle(id: number, { homeTeamGoals, awayTeamGoals }: IUpdateGoalsReq) {
        const [result] = await this.matchEntity.update(
          { homeTeamGoals, awayTeamGoals },
          { where: { id, inProgress: true } },
        );
    
        if (!result) return null;
    
        return result;
      }
}

export default UpdateMatchService;