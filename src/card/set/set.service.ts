import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SetEntity } from './set.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SetService {
  constructor(
    @InjectRepository(SetEntity)
    private readonly setRepository: Repository<SetEntity>,
  ) {}

  async create(setEntity: SetEntity[]): Promise<any> {
    const result = await this.setRepository.save(setEntity);
    return result;
  }

  async findOne(set: string): Promise<SetEntity> {
    const result = await this.setRepository.findOne({
      where: {
        set,
      },
    });
    return result;
  }

  async findAll(): Promise<SetEntity[]> {
    return await this.setRepository.find();
  }
}
