/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { FotoEntity } from "../foto/foto.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [TypeOrmModule], // Export TypeOrmModule to make AlbumEntity available in other modules
})
export class AlbumModule {}