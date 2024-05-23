/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { FotoEntity } from '../foto/foto.entity';
import { RedSocialEntity } from '../red-social/red-social.entity';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @OneToMany(() => FotoEntity, foto => foto.usuario)
  fotos: FotoEntity[];

  @ManyToOne(() => RedSocialEntity, redSocial => redSocial.usuarios)
  redSocial: RedSocialEntity;
}
