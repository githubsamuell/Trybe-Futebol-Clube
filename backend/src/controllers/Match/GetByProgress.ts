import { Request, Response } from 'express';
import IQuery from '../../interfaces/express/IQuery';
import IMatchReq from '../../interfaces/match/IMatchReq';
import StatusCode from '../../utils/statusCode';
import { GetByProgresService } from '../../services';

class GetByProgressController {

    private statusCode = StatusCode;

    private matchByProgress = new GetByProgresService()

    handle = async (req: Request, res: Response): Promise<Response> => {
        const { inProgress } = req.query as unknown as IQuery;
        let booleanQuery: boolean | undefined;
    
        if (inProgress && inProgress.toString() === 'false') {
          booleanQuery = false;
        }
    
        if (inProgress && inProgress.toString() === 'true') {
          booleanQuery = true;
        }
    
        const matchs = await this.matchByProgress.handle(booleanQuery);
        return res.status(this.statusCode.Ok).json(matchs);
      };
}

export default GetByProgressController;