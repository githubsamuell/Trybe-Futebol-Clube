import * as express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import LoginRouter from './routes/User';
import ClubRouter from './routes/Club';
import MatchRouter from './routes/Match';
import LeaderBoarderRouter from './routes/LeaderBoard';
/* import domainError from './middlewares/domainError'; */

class App {
  public app: express.Express;

  // ...
  private loginRouter = new LoginRouter();

  private clubRouter = new ClubRouter();

  private matchRouter = new MatchRouter();

  private leaderRouter = new LeaderBoarderRouter();

  constructor() {
    // ...
    this.app = express();
    this.config();

    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', this.loginRouter.router);
    this.app.use('/clubs', this.clubRouter.router);
    this.app.use('/matchs', this.matchRouter.router);
    this.app.use('/leaderboard', this.leaderRouter.router);

    /* this.app.use(domainError); */

    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Rodando na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
