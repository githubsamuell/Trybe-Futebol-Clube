import { NextFunction, Request, Response } from 'express';
import { IUserReq } from '../interfaces/login';
import StatusCode from '../utils/statusCode';

class VerifyValidFields {
  private statusCode = StatusCode;

  private regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  verifyRequest = async (req: Request, res: Response, next: NextFunction) => {
    const userreq = req.body as IUserReq;
    if (!userreq.email || !userreq.password) {
      const message = 'All fields must be filled';
      return res.status(this.statusCode.Unauthorized).json({ message });
    }

    if (userreq.password.length < 7 || this.regex.test(userreq.email) === false) {
      const message = 'Incorrect email or password';
      return res.status(this.statusCode.Unauthorized).json({ message });
    }

    next();
  };
}

export default VerifyValidFields;
