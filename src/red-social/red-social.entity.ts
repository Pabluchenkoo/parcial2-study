/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity()
export class RedSocialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  slogan: string;

  @OneToMany(() => UsuarioEntity, usuario => usuario.redSocial)
  usuarios: UsuarioEntity[];
}
