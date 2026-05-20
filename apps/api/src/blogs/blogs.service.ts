import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogStatus, Prisma } from '@prisma/client';

import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { slugify } from 'src/common/utils/slugify';

import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBlogDto: CreateBlogDto, authorId: string) {
    const status = createBlogDto.status ?? BlogStatus.DRAFT;

    return this.prisma.blog.create({
      data: {
        ...createBlogDto,
        slug: createBlogDto.slug ?? slugify(createBlogDto.title),
        tags: createBlogDto.tags ?? [],
        status,
        publishedAt: status === BlogStatus.PUBLISHED ? new Date() : null,
        authorId,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async findAllPublic(query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.BlogWhereInput = {
      status: BlogStatus.PUBLISHED,
      ...(query.search
        ? {
            OR: [
              { title: { contains: query.search, mode: 'insensitive' } },
              { excerpt: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.blog.findMany({
        where,
        include: {
          author: {
            select: { id: true, name: true },
          },
        },
        orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.blog.count({ where }),
    ]);

    return { items, pagination: { page, limit, total } };
  }

  async findAllAdmin(query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.BlogWhereInput = query.search
      ? {
          OR: [
            { title: { contains: query.search, mode: 'insensitive' } },
            { excerpt: { contains: query.search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      this.prisma.blog.findMany({
        where,
        include: {
          author: { select: { id: true, name: true } },
        },
        orderBy: [{ createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.blog.count({ where }),
    ]);

    return { items, pagination: { page, limit, total } };
  }

  async findOnePublic(id: string) {
    const item = await this.prisma.blog.findFirst({
      where: {
        id,
        status: BlogStatus.PUBLISHED,
      },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    });

    if (!item) throw new NotFoundException('Blog not found');
    return item;
  }

  async findOneAdmin(id: string) {
    const item = await this.prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!item) throw new NotFoundException('Blog not found');
    return item;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    await this.findOneAdmin(id);

    return this.prisma.blog.update({
      where: { id },
      data: {
        ...updateBlogDto,
        slug: updateBlogDto.slug ?? (updateBlogDto.title ? slugify(updateBlogDto.title) : undefined),
        publishedAt:
          updateBlogDto.status === BlogStatus.PUBLISHED ? new Date() : undefined,
      },
      include: {
        author: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: string) {
    await this.findOneAdmin(id);
    await this.prisma.blog.delete({ where: { id } });
    return { message: 'Blog deleted successfully' };
  }
}
