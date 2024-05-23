/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { RedSocialEntity } from './red-social.entity';

@Controller('redes-sociales')
export class RedSocialController {
  constructor(private readonly redSocialService: RedSocialService) {}

  @Get()
  findAll(): Promise<RedSocialEntity[]> {
    return this.redSocialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<RedSocialEntity> {
    return this.redSocialService.findOne(id);
  }

  @Post()
  create(@Body() redSocial: RedSocialEntity): Promise<RedSocialEntity> {
    return this.redSocialService.create(redSocial);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() redSocial: RedSocialEntity): Promise<RedSocialEntity> {
    return this.redSocialService.update(id, redSocial);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.redSocialService.remove(id);
  }
}