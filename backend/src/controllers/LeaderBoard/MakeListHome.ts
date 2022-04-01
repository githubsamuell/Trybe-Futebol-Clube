import { Request, Response } from 'express';
import ILeaderBoardRes from '../../interfaces/leaderBoard/leaderBoardRes';
import LeaderBoardService from '../../services/LeaderBoard/LeaderBoard';
import ILeaderBoardQuery from '../../interfaces/leaderBoard/leaderBoardQuery';
import { makeListHome } from '../../utils/makeList';

class makeListHomeController {
    private listLeaderBoarder = new LeaderBoardService();

  private makeListHome = makeListHome;

  private result: ILeaderBoardRes[];

  handle = async (req: Request, res: Response) => {
    const leaderList = await this.listLeaderBoarder.handle();
    const list = await this.doItHome(leaderList);
    const orded = this.orderIt(list);
    return res.status(200).json(orded);
  };

  private doItHome(allquery: ILeaderBoardQuery[]) {
    return this.makeListHome(allquery);
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

export default makeListHomeController;