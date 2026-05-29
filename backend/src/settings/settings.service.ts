import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';

import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.setting.findMany({
      orderBy: { key: 'asc' },
    });
  }

  findOne(key: string) {
    return this.prisma.setting.findUnique({ where: { key } });
  }

  upsert(key: string, updateSettingDto: UpdateSettingDto, userId?: string) {
    const jsonValue = updateSettingDto.value as Prisma.InputJsonValue;

    return this.prisma.setting.upsert({
      where: { key },
      update: {
        value: jsonValue,
        description: updateSettingDto.description,
        updatedById: userId,
      },
      create: {
        key,
        value: jsonValue,
        description: updateSettingDto.description,
        updatedById: userId,
      },
    });
  }
}
