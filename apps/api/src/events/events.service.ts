import { Injectable, NotFoundException } from '@nestjs/common';
import { EventStatus, Prisma } from '@prisma/client';

import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { slugify } from 'src/common/utils/slugify';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        slug: createEventDto.slug ?? slugify(createEventDto.title),
        eventDate: new Date(createEventDto.eventDate),
        status: createEventDto.status ?? EventStatus.UPCOMING,
      },
    });
  }

  async findAll(query: PaginationQueryDto & { status?: EventStatus }) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Prisma.EventWhereInput = {
      ...(query.search
        ? {
            OR: [
              { title: { contains: query.search, mode: 'insensitive' } },
              { description: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(query.status ? { status: query.status } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        orderBy: [{ eventDate: 'asc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      items,
      pagination: { page, limit, total },
    };
  }

  async findOne(id: string) {
    const item = await this.prisma.event.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Event not found');
    return item;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.findOne(id);

    return this.prisma.event.update({
      where: { id },
      data: {
        ...updateEventDto,
        slug: updateEventDto.slug ?? (updateEventDto.title ? slugify(updateEventDto.title) : undefined),
        eventDate: updateEventDto.eventDate ? new Date(updateEventDto.eventDate) : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.event.delete({ where: { id } });
    return { message: 'Event deleted successfully' };
  }
}
