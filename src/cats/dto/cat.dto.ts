export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

export class ListAllEntities {
  name?: string;
  age?: string;
  breed?: string;
}

export class UpdateCatDto {
  name?: string;
  age?: string;
  breed?: string;
}

export class UserEntity {
  name: string;
  email: string;
}
