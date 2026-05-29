import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { slugify } from 'src/common/utils/slugify';

import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createApplicationDto: CreateApplicationDto) {
    return this.prisma.application.create({
      data: {
        ...createApplicationDto,
        slug: createApplicationDto.slug ?? slugify(createApplicationDto.title),
      },
    });
  }

  async findAll(query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 30;
    const skip = (page - 1) * limit;

    const where: Prisma.ApplicationWhereInput = query.search
      ? {
          OR: [
            { title: { contains: query.search, mode: 'insensitive' } },
            { description: { contains: query.search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      this.prisma.application.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.application.count({ where }),
    ]);

    return {
      items,
      pagination: { page, limit, total },
    };
  }

  async findOne(id: string) {
    const item = await this.prisma.application.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Application not found');
    return item;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    await this.findOne(id);

    return this.prisma.application.update({
      where: { id },
      data: {
        ...updateApplicationDto,
        slug:
          updateApplicationDto.slug ??
          (updateApplicationDto.title ? slugify(updateApplicationDto.title) : undefined),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.application.delete({ where: { id } });
    return { message: 'Application deleted successfully' };
  }
}
