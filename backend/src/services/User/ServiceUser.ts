import bcrypt = require('bcryptjs');
import IUserReq from '../../interfaces/login/IUserReq';
import User from '../../database/modelsSequelize/user';
import { IUserRes } from '../../interfaces/login';

class ServiceUser extends User {
  public async findOneUser({ password, email }: IUserReq): Promise<IUserRes | null> {
    const user = await this.findUser(email);

    if (!user) throw new Error('Not Found');

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

export default ServiceUser;
