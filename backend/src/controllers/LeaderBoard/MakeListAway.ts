import { Request, Response } from 'express';
import ILeaderBoardRes from '../../interfaces/leaderBoard/leaderBoardRes';
import LeaderBoardService from '../../services/LeaderBoard/LeaderBoard';
import ILeaderBoardQuery from '../../interfaces/leaderBoard/leaderBoardQuery';
import { makeList } from '../../utils/makeList';

class makeListAwayController {
    private listLeaderBoarder = new LeaderBoardService();

  private makeListAway = makeList;

  private result: ILeaderBoardRes[];

  handle = async (req: Request, res: Response) => {
    const leaderList = await this.listLeaderBoarder.handle();
    const list = await this.doItAway(leaderList);
    const orded = this.orderIt(list);
    return res.status(200).json(orded);
  };

  private doItAway(allquery: ILeaderBoardQuery[]) {
    return this.makeListAway(allquery);
  }

  private orderIt(leaderRes: ILeaderBoardRes[]) {
    this.result = leaderRes.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return a.goalsOwn - b.goalsOwn;
    });
    return this.result;
  }
}

export default makeListAwayController;