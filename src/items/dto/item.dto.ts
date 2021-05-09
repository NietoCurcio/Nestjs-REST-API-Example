import { IsString, IsInt, IsNumberString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
}

export class FindItemById {
  @IsNumberString()
  id: number;
}
