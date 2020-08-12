import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubTypeEntity } from './sub-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubTypeService {
  constructor(
    @InjectRepository(SubTypeEntity)
    private readonly subTypeRepository: Repository<SubTypeEntity>,
  ) {}

  async create(subTypeEntity: SubTypeEntity[]): Promise<any> {
    const result = await this.subTypeRepository.save(subTypeEntity);
    return result;
  }

  async findOne(type: string): Promise<SubTypeEntity> {
    const result = await this.subTypeRepository.findOne({
      where: {
        name: type,
      },
    });
    return result;
  }

  async findAll(): Promise<SubTypeEntity[]> {
    return await this.subTypeRepository.find();
  }
}
