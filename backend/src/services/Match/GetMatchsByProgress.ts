import Club from '../../database/modelsSequelize/club';
import Match from '../../database/modelsSequelize/match';

class GetMatchsProgService {

    private clubEntity = Club

    private matchEntity = Match

    public async handle(inProgress: boolean | undefined): Promise<Match[]> {
        if (inProgress === undefined) {
          const result = await this.matchEntity.findAll({
            include: [
              { model: this.clubEntity, as: 'homeClub', attributes: ['clubName'] },
              { model: this.clubEntity, as: 'awayClub', attributes: ['clubName'] },
            ],
          });
    
          return result;
        }
        const resultWithProgress = await this.matchEntity.findAll({
          where: { inProgress },
          include: [
            { model: this.clubEntity, as: 'homeClub', attributes: ['clubName'] },
            { model: this.clubEntity, as: 'awayClub', attributes: ['clubName'] },
          ],
        });
        return resultWithProgress;
      }
}

export default GetMatchsProgService;