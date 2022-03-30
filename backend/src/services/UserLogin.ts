import bcrypt = require('bcryptjs');
import IUserReq from '../interfaces/login/IUserReq';
import User from '../database/modelsSequelize/user';
import { IUserRes } from '../interfaces/login';

class LoginUserService {
  userEntity = User;

  public async findUser({ password, email }: IUserReq): Promise<IUserRes | null> {
    const user = await this.userEntity.findOne({ where: { email }, raw: true });

    if (!user) return null;

    const verifypassword = bcrypt.compareSync(password, user.password);

    if (!verifypassword) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,

    };
  }
}

export default LoginUserService;
