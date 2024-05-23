/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';

@Controller('fotos')
export class FotoController {
  constructor(private readonly fotoService: FotoService) {}

  @Get()
  findAll(): Promise<FotoEntity[]> {
    return this.fotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<FotoEntity> {
    return this.fotoService.findOne(id);
  }

  @Post()
  create(@Body() foto: FotoEntity): Promise<FotoEntity> {
    return this.fotoService.create(foto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() foto: FotoEntity): Promise<FotoEntity> {
    return this.fotoService.update(id, foto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.fotoService.remove(id);
  }
}