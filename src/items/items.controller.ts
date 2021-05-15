import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, FindItemById } from './dto/item.dto';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get('one')
  async findOne() {
    // testing using async/await in controller, or only in service, or in both
    // the best seems to be leave it to nest, do not make await
    // "Every async function has to return a Promise. This means that you can return
    // a deferred value that Nest will be able to resolve by itself."
    let n = Date.now();
    let find = this.itemsService.findOne();
    console.log(find);
    console.log(Date.now() - n);
    return find;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ excludePrefixes: ['_'] })
  @Get(':id')
  findById(@Param() params: FindItemById) {
    // return this.itemsService.findById(params.id);
    return new CreateItemDto({
      name: 'name',
      description: 'description',
      _property: 'property',
    });
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Post('uploads')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => cb(null, './src/upload'),
        filename: (req, file, cb) =>
          cb(null, file.filename + '-' + file.originalname),
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
