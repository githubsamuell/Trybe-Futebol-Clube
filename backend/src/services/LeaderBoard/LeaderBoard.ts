import { makeQuery } from '../../utils';

class LeaderBoardGetAllService {
  private makeQuery = makeQuery;

  async handle() {
    const leaderBoard = await this.makeQuery();

    return leaderBoard;
  }
}

export default LeaderBoardGetAllService;
