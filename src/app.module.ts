/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RedSocialModule } from './red-social/red-social.module';
import { AlbumModule } from './album/album.module';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // type of your database
      host: 'db', // database host
      port: 5432,        // database port
      username: 'ISIS3710', // username
      password: 'qwerty123', // password
      database: 'parcial2_db', // name of your database
      autoLoadEntities: true,
      synchronize: true,
    }),
    FotoModule,
    UsuarioModule,
    RedSocialModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}