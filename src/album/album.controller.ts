/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from "../foto/foto.entity";

@Controller('albumes')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): Promise<AlbumEntity[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AlbumEntity> {
    return this.albumService.findOne(id);
  }

  @Post()
  create(@Body() album: AlbumEntity): Promise<AlbumEntity> {
    return this.albumService.createAlbum(album);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() album: AlbumEntity): Promise<AlbumEntity> {
    return this.albumService.update(id, album);
  }

  @Post(':id/fotos')
  addPhotoToAlbum(@Param('id') albumId: number, @Body() foto: FotoEntity): Promise<AlbumEntity> {
    return this.albumService.addPhotoToAlbum(albumId, foto);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: number): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}