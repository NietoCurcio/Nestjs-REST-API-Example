import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, FindItemById } from './dto/item.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get('one')
  findOne() {
    // testing using async/await in controller, or only in service, or in both
    // the best seems to be leave it to nest, do not make await
    let n = Date.now();
    let find = this.itemsService.findOne();
    console.log(Date.now() - n);
    return find;
  }

  @Get(':id')
  findById(@Param() params: FindItemById) {
    return this.itemsService.findById(params.id);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }
}
