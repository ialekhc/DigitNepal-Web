import { BadRequestException, Injectable } from '@nestjs/common';

import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadImage(file: Express.Multer.File, uploadedById?: string) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const uploadResult = await this.cloudinaryService.uploadImage(file.buffer);

    return this.prisma.media.create({
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        mimeType: file.mimetype,
        originalName: file.originalname,
        uploadedById,
      },
    });
  }

  findAll() {
    return this.prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}
