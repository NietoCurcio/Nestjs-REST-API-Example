import { IsString, IsNumberString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  @Exclude({ toPlainOnly: true })
  description: string;

  @IsString()
  _property: string;

  constructor(item) {
    Object.assign(this, item);
  }
}

export class FindItemById {
  @IsNumberString()
  id: number;
}
