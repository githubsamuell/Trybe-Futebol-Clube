import Club from '../database/modelsSequelize/club';

class ClubService {
  private clubeEntity = Club;

  async getAllClubs() {
    const clubs = await this.clubeEntity.findAll();
    return clubs;
  }

  async findOneClub(id: number) {
    const club = await this.clubeEntity.findOne({ where: { id } });
    if (!club) return null;
    return club;
  }
}

export default ClubService;
