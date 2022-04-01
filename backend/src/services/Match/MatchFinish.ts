import Match from '../../database/modelsSequelize/match';

class MatchFinishService {
  private matchEntity = Match;

  async handle(id: number) {
    await this.matchEntity.update(
      { inProgress: false },
      { where: { id } },
    );

    return 'ok';
  }
}

export default MatchFinishService;
