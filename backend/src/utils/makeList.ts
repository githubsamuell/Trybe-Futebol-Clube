import ILeaderBoardRes from '../interfaces/leaderBoard/leaderBoardRes';
import Club from '../database/modelsSequelize/club';
import ILeaderBoard from '../interfaces/leaderBoard/leaderBoardQuery';

async function allNameClub() {
  const clubs = await Club.findAll();
  const names = clubs.map((each) => each.clubName);
  return names;
}

class TeamData {
  name: string;

  totalPoints = 0;

  totalGames = 0;

  totalVictories = 0;

  totalDraws = 0;

  totalLosses = 0;

  goalsFavor = 0;

  goalsOwn = 0;

  goalsBalance = 0;

  efficiency = 0;

  results: ILeaderBoardRes;

  constructor(name: string) {
    this.name = name;
    this.results = {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }

  sumGames(game: number) {
    this.totalGames += game;
  }

  sumVictory(victory: number) {
    this.totalVictories += victory;
  }

  sumDraws(draws: number) {
    this.totalDraws += draws;
  }

  sumLosses(loses: number) {
    this.totalLosses += loses;
  }

  sumGoalsFavor(goalsFavor: number) {
    this.goalsFavor += goalsFavor;
  }

  sumGoalsOwn(goalsOwn: number) {
    this.goalsOwn += goalsOwn;
  }

  calcPoints() {
    this.totalPoints = this.totalDraws + (this.totalVictories * 3);
  }

  calcGoalsBalance() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  calcEfficiency() {
    this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }

  async returnResult() {
    return this.results;
  }
}

const returnobjetct = (paiload: ILeaderBoardRes) => ({ name: paiload.name,
  totalPoints: paiload.totalPoints,
  totalGames: paiload.totalGames,
  totalVictories: paiload.totalVictories,
  totalDraws: paiload.totalDraws,
  totalLosses: paiload.totalLosses,
  goalsFavor: paiload.goalsFavor,
  goalsOwn: paiload.goalsOwn,
  goalsBalance: paiload.goalsBalance,
  efficiency: paiload.efficiency });

function eachArray(arra: ILeaderBoard[], cla: TeamData) {
  return arra.forEach((each) => {
    cla.sumGames(1); cla.sumGoalsFavor(each.goalsFavor); cla.sumGoalsOwn(each.goalsOwn);
    if (each.RESULTS === 'DERROTA') cla.sumLosses(1);
    if (each.RESULTS === 'EMPATOU') cla.sumDraws(1);
    if (each.RESULTS === 'VITORIA') cla.sumVictory(1);
    cla.calcPoints(); cla.calcGoalsBalance(); cla.calcEfficiency();
  });
}

async function makeList(obje: ILeaderBoard[]) {
  const namesClub = await allNameClub() as unknown as string[];
  const arr = [] as unknown as ILeaderBoardRes[];
  for (let i = 0; i < namesClub.length; i += 1) {
    const teamg = new TeamData(namesClub[i]);
    const todosJogosUm = obje.filter((each) => each.name === teamg.name);
    eachArray(todosJogosUm, teamg);
    arr.push(returnobjetct(teamg));
  }
  return arr;
}

async function makeListHome(obje: ILeaderBoard[]) {
  const namesClub = await allNameClub() as unknown as string[];
  const arr = [] as unknown as ILeaderBoardRes[];
  for (let i = 0; i < namesClub.length; i += 1) {
    const teamg = new TeamData(namesClub[i]);
    const todosJogosUm = obje.filter((each) => each.name === teamg.name && each.Local === 'CASA');
    eachArray(todosJogosUm, teamg);
    arr.push(returnobjetct(teamg));
  }
  return arr;
}

async function makeListAway(obje: ILeaderBoard[]) {
  const namesClub = await allNameClub() as unknown as string[];
  const arr = [] as unknown as ILeaderBoardRes[];
  for (let i = 0; i < namesClub.length; i += 1) {
    const teamg = new TeamData(namesClub[i]);
    const todosJogosUm = obje.filter((each) => each.name === teamg.name && each.Local === 'FORA');
    eachArray(todosJogosUm, teamg);
    arr.push(returnobjetct(teamg));
  }
  return arr;
}

export { makeList, makeListHome, makeListAway };
