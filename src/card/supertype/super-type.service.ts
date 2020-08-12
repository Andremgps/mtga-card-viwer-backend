import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperTypeEntity } from './super-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuperTypeService {
  constructor(
    @InjectRepository(SuperTypeEntity)
    private readonly superTypeRepository: Repository<SuperTypeEntity>,
  ) {}

  async create(superTypeEntity: SuperTypeEntity[]): Promise<any> {
    const result = await this.superTypeRepository.save(superTypeEntity);
    return result;
  }

  async findOne(type: string): Promise<SuperTypeEntity> {
    const result = await this.superTypeRepository.findOne({
      where: {
        name: type,
      },
    });
    return result;
  }

  async findAll(): Promise<SuperTypeEntity[]> {
    return await this.superTypeRepository.find();
  }
}
