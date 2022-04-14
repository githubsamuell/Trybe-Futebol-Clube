import { makeQuery } from '../../utils';

class ServiceLeaderBoardGetAll {
  private makeQuery = makeQuery;

  async handle() {
    const leaderBoard = await this.makeQuery();

    return leaderBoard;
  }
}

export default ServiceLeaderBoardGetAll;
