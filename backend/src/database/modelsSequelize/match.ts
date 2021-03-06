import { DataTypes, Model } from 'sequelize';
import { IMatchReq } from '../../interfaces/match';
import db from '.';
import Club from './club';
import IUpdateGoalsReq from '../../interfaces/match/IUpdateGoals';
// import OtherModel from './OtherModel';

class Match extends Model {
  saveMatch = async (matchInfo: IMatchReq) => {
    const newMatch = await Match.create(matchInfo);
    return newMatch;
  };

  updateMatch = async (id: number, { homeTeamGoals, awayTeamGoals }: IUpdateGoalsReq) => {
    const [updateMatch] = await Match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id, inProgress: true } },
    );
    return updateMatch;
  };

  finishMatch = async (id: number) => {
    const finishMatch = await Match.update({ inProgress: false }, { where: { id } });
    return finishMatch;
  };

  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init({
  // ... Campo
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,

  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatch' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatch' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Match;
