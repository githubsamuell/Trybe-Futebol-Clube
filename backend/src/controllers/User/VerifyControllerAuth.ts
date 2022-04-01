import { Request, Response } from 'express';
import StatusCode from '../../utils/statusCode';

class VerifyAuthController {
  private StatusCode = StatusCode;

  handle = (req:Request, res: Response) => {
    const { decodedUser } = req;

    if (!decodedUser) {
      const message = 'There is no team with such id!';
      return res.status(this.StatusCode.Unauthorized).json({ message });
    }

    return res.status(this.StatusCode.Ok).json(decodedUser.role);
  };
}

export default VerifyAuthController;
