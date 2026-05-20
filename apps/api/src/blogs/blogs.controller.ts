import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Role } from '@prisma/client';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR)
  @Post()
  create(
    @Body() createBlogDto: CreateBlogDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.blogsService.create(createBlogDto, user.id);
  }

  @Public()
  @Get()
  findAllPublic(@Query() query: PaginationQueryDto) {
    return this.blogsService.findAllPublic(query);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR)
  @Get('admin/all')
  findAllAdmin(@Query() query: PaginationQueryDto) {
    return this.blogsService.findAllAdmin(query);
  }

  @Public()
  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.blogsService.findOnePublic(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR)
  @Get('admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.blogsService.findOneAdmin(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
