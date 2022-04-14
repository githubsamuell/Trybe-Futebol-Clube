import { Request, Response } from 'express';
import ILeaderBoardRes from '../../interfaces/leaderBoard/leaderBoardRes';
import { makeList, makeListAway, makeListHome } from '../../utils/makeList';
import ServiceLeaderBoardGetAll from '../../services/LeaderBoard/ServiceLeaderBoard';

class ControllerLeaderBoard {
  constructor(private serviceLeaderBoarder = new ServiceLeaderBoardGetAll()) {}

  private makeList = makeList;

  private makeListAway = makeListAway;

  private makeListHome = makeListHome;

  private result: ILeaderBoardRes[];

  readAll = async (req: Request, res: Response) => {
    const leaderList = await this.serviceLeaderBoarder.handle();
    const list = await this.makeList(leaderList);
    const orded = this.orderIt(list);
    return res.status(200).json(orded);
  };

  readAway = async (req: Request, res: Response) => {
    const leaderList = await this.serviceLeaderBoarder.handle();
    const list = await this.makeListAway(leaderList);
    const orded = this.orderIt(list);
    return res.status(200).json(orded);
  };

  readHome = async (req: Request, res: Response) => {
    const leaderList = await this.serviceLeaderBoarder.handle();
    const list = await this.makeListHome(leaderList);
    const orded = this.orderIt(list);
    return res.status(200).json(orded);
  };

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

export default ControllerLeaderBoard;
