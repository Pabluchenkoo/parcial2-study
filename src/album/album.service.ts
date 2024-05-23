/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from "../foto/foto.entity";

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FotoEntity)
    private fotoRepository: Repository<FotoEntity>,
  ) {}

  findAll(): Promise<AlbumEntity[]> {
    return this.albumRepository.find();
  }

  async findOne(id: number): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  //Punto2.1 Logica!
  async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
    if (!album.titulo || album.titulo.trim() === '') {
      throw new BadRequestException('El título no puede estar vacío');
    }
    return this.albumRepository.save(album);
  }

  async findAlbumById(id: number): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async addPhotoToAlbum(albumId: number, foto: FotoEntity): Promise<AlbumEntity> {
    const album = await this.findAlbumById(albumId);
    if (new Date(foto.fecha) < album.fechaInicio || new Date(foto.fecha) > album.fechaFin) {
      throw new BadRequestException('La fecha de la foto no está entre las fechas de inicio y fin del álbum');
    }
    foto.album = album;
    await this.fotoRepository.save(foto);
    return album;
  }

  async deleteAlbum(id: number): Promise<void> {
    await this.findAlbumById(id);
    const fotos = await this.fotoRepository.find({ where: { album: { id } } });
    if (fotos.length > 0) {
      throw new BadRequestException('No se puede eliminar un álbum que tiene fotos asignadas');
    }
    await this.albumRepository.delete(id);
  }

  //Punto2.1 Logica!

  create(album: AlbumEntity): Promise<AlbumEntity> {
    return this.albumRepository.save(album);
  }

  async update(id: number, album: AlbumEntity): Promise<AlbumEntity> {
    await this.albumRepository.update(id, album);
    return this.findOne(id);
  }


}