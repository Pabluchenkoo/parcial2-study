/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './red-social.entity';

@Injectable()
export class RedSocialService {
  constructor(
    @InjectRepository(RedSocialEntity)
    private redSocialRepository: Repository<RedSocialEntity>,
  ) {}

  findAll(): Promise<RedSocialEntity[]> {
    return this.redSocialRepository.find();
  }

  async findOne(id: number): Promise<RedSocialEntity> {
    const redSocial = await this.redSocialRepository.findOne({ where: { id } });
    if (!redSocial) {
      throw new NotFoundException(`RedSocial with ID ${id} not found`);
    }
    return redSocial;
  }

  create(redSocial: RedSocialEntity): Promise<RedSocialEntity> {

    if (redSocial.slogan !=='' && redSocial.slogan.length < 20)
    {
      throw new BadRequestException('El slogan no puede estar vacío y debe tener menos de 20 caracteres');
    }

    return this.redSocialRepository.save(redSocial);
  }

  async update(id: number, redSocial: RedSocialEntity): Promise<RedSocialEntity> {
    await this.redSocialRepository.update(id, redSocial);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.redSocialRepository.delete(id);
  }
}