/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FotoEntity } from '../foto/foto.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column()
  titulo: string;

  @OneToMany(() => FotoEntity, foto => foto.album)
  fotos: FotoEntity[];
}
