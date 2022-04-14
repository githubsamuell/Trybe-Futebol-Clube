import { Request, Response } from 'express';
import ServiceClub from '../../services/Club/ServiceClub';
import StatusCode from '../../utils/statusCode';

class ControllerClub {
  constructor(private clubService = new ServiceClub()) {}

  private statusCode = StatusCode;

  readOne = async (req:Request, res: Response) => {
    const id = Number(req.params.id);
    const club = await this.clubService.findOne(id);
    if (club === null) {
      return res.status(this.statusCode.NotFound)
        .json({ message: 'club nao encontrado' });
    }

    return res.status(this.statusCode.Ok).json(club);
  };

  read = async (req:Request, res: Response) => {
    const clubs = await this.clubService.getAll();
    return res.status(this.statusCode.Ok).json(clubs);
  };
}

export default ControllerClub;
