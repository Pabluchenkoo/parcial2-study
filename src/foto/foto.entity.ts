/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AlbumEntity } from '../album/album.entity';

@Entity()
export class FotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ISO: number;

  @Column()
  velObturacion: number;

  @Column()
  apertura: number;

  @Column()
  fecha: string;

  @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
  @JoinColumn({ name: 'usuarioId' })
  usuario: UsuarioEntity;

  @ManyToOne(() => AlbumEntity, album => album.fotos)
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;
}
