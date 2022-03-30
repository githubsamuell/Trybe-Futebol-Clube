/* import LeaderBoardOnHome from '../utils/makeListHome';
import LeaderBoard from '../utils/makeList';
import LeaderBoardAway from '../utils/makeListAway'; */
import { makeQuery } from '../utils';

class LeaderBoardService {
  private makeQuery = makeQuery;

  async getAll() {
    const leaderBoard = await this.makeQuery();

    return leaderBoard;
  }
}

export default LeaderBoardService;
