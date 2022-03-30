import ILeaderBoardQuery from '../interfaces/leaderBoard/leaderBoardQuery';
import { meusql, query } from './query';

async function makeQuery() {
  const [resut] = await meusql.execute(query);
  const result = resut as unknown as ILeaderBoardQuery[];
  return result;
}

export default makeQuery;
