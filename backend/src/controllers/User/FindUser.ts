import { Request, Response } from 'express';
import StatusCode from '../../utils/statusCode';
import { IUserReq } from '../../interfaces/login';
import JwtMethods from '../../utils/jwtMethods';
import { FindUserService } from '../../services';

class FindUserController {
  private StatusCode = StatusCode;

  private jwtUtils = new JwtMethods();

  private loginService = new FindUserService();

  handle = async (req: Request, res: Response): Promise<Response> => {
    const requestData = req.body as IUserReq;
    const user = await this.loginService.handle(requestData);
    if (user === null) {
      return res.status(this.StatusCode.Unauthorized)
        .json({ message: 'Incorrect email or password' });
    }

    const token = this.jwtUtils.generateToken(user);

    return res.status(this.StatusCode.Ok).json({ user: { ...user }, token });
  };

}

export default FindUserController;
