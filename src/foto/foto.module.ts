/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { FotoService } from './foto.service';
import { FotoController } from './foto.controller';
import { AlbumEntity } from "../album/album.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FotoEntity,AlbumEntity])],
  providers: [FotoService],
  controllers: [FotoController],
  exports: [TypeOrmModule], // Export TypeOrmModule to make AlbumEntity available in other modules

})
export class FotoModule {}