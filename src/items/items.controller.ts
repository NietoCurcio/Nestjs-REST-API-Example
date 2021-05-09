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

  @Get(':id')
  findById(@Param() params: FindItemById) {
    console.log(params);
    return this.itemsService.findById(params.id);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    console.log(createItemDto);
    return { item: 'item' };
  }
}
