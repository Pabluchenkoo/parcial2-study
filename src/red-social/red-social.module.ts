/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './red-social.entity';
import { RedSocialService } from './red-social.service';
import { RedSocialController } from './red-social.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RedSocialEntity])],
  providers: [RedSocialService],
  controllers: [RedSocialController],
})
export class RedSocialModule {}