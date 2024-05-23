/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';
import { AlbumEntity } from "../album/album.entity";

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private fotoRepository: Repository<FotoEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  findAll(): Promise<FotoEntity[]> {
    return this.fotoRepository.find();
  }

  async findOne(id: number): Promise<FotoEntity> {
    const foto = await this.fotoRepository.findOne({ where: { id } });
    if (!foto) {
      throw new BadRequestException(`Foto with ID ${id} not found`);
    }
    return foto;
  }

  create(foto: FotoEntity): Promise<FotoEntity> {
    if(foto.ISO >100 && foto.ISO <6400 && foto.velObturacion > 2 && foto.velObturacion <250
    && foto.apertura>1 && foto.apertura <32)
    {
      throw new Error('Error en los datos');
    }
    //Al momento de crear una foto, máx 2 de estos valores deben estar por
    // encima del valor medio de sus cotas.
    const medioISO = (100 + 6400) / 2;
    const medioVelObturacion = (2 + 250) / 2;
    const medioApertura = (1 + 32) / 2;

    const valoresAltos = [foto.ISO > medioISO, foto.velObturacion > medioVelObturacion, foto.apertura > medioApertura].filter(Boolean).length;

    if (valoresAltos > 2) {
      throw new BadRequestException('Máximo 2 valores pueden estar por encima del valor medio de sus cotas');
    }
    return this.fotoRepository.save(foto);
  }

  async update(id: number, foto: FotoEntity): Promise<FotoEntity> {
    await this.fotoRepository.update(id, foto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const foto = await this.findOne(id);
    const albumId = foto.album.id;

    await this.fotoRepository.delete(id);

    const fotosInAlbum = await this.fotoRepository.find({ where: { album: { id: albumId } } });

    if (fotosInAlbum.length === 0) {
      await this.albumRepository.delete(albumId);
    }
  }
}