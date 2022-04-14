import { Request, Response } from 'express';
import ServiceUser from '../../services/User/ServiceUser';
import StatusCode from '../../utils/statusCode';
import { IUserReq } from '../../interfaces/login';
import JwtMethods from '../../utils/jwtMethods';

class ControllerUser {
  private StatusCode = StatusCode;

  private jwtUtils = new JwtMethods();

  constructor(private userService = new ServiceUser()) {}

  readOne = async (req: Request, res: Response): Promise<Response> => {
    const requestData = req.body as IUserReq;
    const user = await this.userService.findOneUser(requestData);
    if (user === null) {
      return res.status(this.StatusCode.Unauthorized)
        .json({ message: 'Incorrect email or password' });
    }

    const token = this.jwtUtils.generateToken(user);

    return res.status(this.StatusCode.Ok).json({ user: { ...user }, token });
  };
}

export default ControllerUser;
