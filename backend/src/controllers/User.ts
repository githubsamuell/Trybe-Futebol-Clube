import { Request, Response } from 'express';
import StatusCode from '../utils/statusCode';
import { IUserReq } from '../interfaces/login';
import JwtMethods from '../utils/jwtMethods';
import LoginUserService from '../services/UserLogin';

class LoginUserController {
  private StatusCode = StatusCode;

  private jwtUtils = new JwtMethods();

  private loginService = new LoginUserService();

  findUser = async (req: Request, res: Response): Promise<Response> => {
    const requestData = req.body as IUserReq;
    const user = await this.loginService.findUser(requestData);
    if (user === null) {
      return res.status(this.StatusCode.Unauthorized)
        .json({ message: 'Incorrect email or password' });
    }

    const token = this.jwtUtils.generateToken(user);

    return res.status(this.StatusCode.Ok).json({ user: { ...user }, token });
  };

  verifyControllerAuth = (req:Request, res: Response) => {
    const { decodedUser } = req;

    if (!decodedUser) {
      const message = 'There is no team with such id!';
      return res.status(this.StatusCode.Unauthorized).json({ message });
    }

    return res.status(this.StatusCode.Ok).json(decodedUser.role);
  };
}

export default LoginUserController;
