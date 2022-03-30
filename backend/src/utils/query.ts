import * as mysql from 'mysql2/promise';

import dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.DB_PORT as unknown as number;

const meusql = mysql.createPool({
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'TRYBE_FUTEBOL_CLUBE',
  host: process.env.DB_HOST || 'localhost',
  port: PORT || 3002,

});

const query = `SELECT
c.club_name as name,
c.id,
m.away_team_goals AS golsDefora,
m.home_team_goals AS golsDeCasa,
CASE
    WHEN c.id = m.home_team THEN 'CASA'
    ELSE 'FORA'
END AS 'Local',
CASE
    WHEN c.id = m.home_team THEN m.home_team_goals
    ELSE m.away_team_goals
END AS 'goalsFavor',
 CASE
    WHEN c.id = m.home_team THEN m.away_team_goals
    ELSE m.home_team_goals
END AS 'goalsOwn',
CASE
    WHEN c.id = m.home_team AND m.home_team_goals > m.away_team_goals Then 'VITORIA'
    WHEN c.id = m.home_team AND m.home_team_goals < m.away_team_goals THEN 'DERROTA'
    WHEN c.id = m.away_team AND m.away_team_goals > m.home_team_goals THEN 'VITORIA'
    WHEN c.id = m.away_team AND m.away_team_goals < m.home_team_goals THEN 'DERROTA'
    when c.id = m.away_team and m.away_team_goals = m.home_team_goals THEN 'EMPATOU'
    when c.id = m.home_team and m.away_team_goals = m.home_team_goals THEN 'EMPATOU'
END AS 'RESULTS'
FROM
clubs AS c
    JOIN
matchs AS m
WHERE
(c.id = m.away_team OR c.id = m.home_team)
    AND in_progress = 0
ORDER BY c.id
LIMIT 0 , 1000`;

export { query, meusql };
