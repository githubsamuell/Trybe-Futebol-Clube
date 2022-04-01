import Club from '../../database/modelsSequelize/club';

class FindOneClubService {
  private clubeEntity = Club;

  async handle(id: number) {
    const club = await this.clubeEntity.findOne({ where: { id } });
    if (!club) return null;
    return club;
  }
}

export default FindOneClubService;
