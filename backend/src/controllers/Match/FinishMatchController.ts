import { Request, Response } from 'express';
import StatusCode from '../../utils/statusCode';
import { MatchFinishService } from '../../services';

class FinishMatchController {
  private finishMatch = new MatchFinishService();

  private statusCode = StatusCode;

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.finishMatch.handle(Number(id));
    return res.status(200).json('Match was update');
  };
}

export default FinishMatchController;