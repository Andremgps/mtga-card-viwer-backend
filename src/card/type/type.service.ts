import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeEntity } from './type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(TypeEntity)
    private readonly typeRepository: Repository<TypeEntity>,
  ) {}

  async create(typeEntity: TypeEntity[]): Promise<any> {
    const result = await this.typeRepository.save(typeEntity);
    return result;
  }

  async findOne(type: string): Promise<TypeEntity> {
    const result = await this.typeRepository.findOne({
      where: {
        name: type,
      },
    });
    return result;
  }

  async findAll(): Promise<TypeEntity[]> {
    return await this.typeRepository.find();
  }
}
