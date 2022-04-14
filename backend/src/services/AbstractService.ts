import { Model, Sequelize  } from 'sequelize/types';

abstract class Service {
  nameEntity: Model;

  constructor(nameEntity: InstanceType<Model>) {
    this.nameEntity = nameEntity;
  }
}

