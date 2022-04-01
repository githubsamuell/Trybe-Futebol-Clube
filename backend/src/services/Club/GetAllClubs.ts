import Club from '../../database/modelsSequelize/club';

class GetAllClubsService {
    private clubEntity = Club
    async handle() {
        const clubs = await this.clubEntity.findAll();
        return clubs;
      }
}

export default GetAllClubsService;