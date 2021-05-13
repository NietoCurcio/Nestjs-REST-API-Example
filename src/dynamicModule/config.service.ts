import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
// console.log('CHEGUEI AQUI? 22');
@Injectable()
export class ConfigService {
  private readonly envConfig;

  constructor(@Inject('CONFIG_OPTIONS') private options) {
    console.log('NAO ESTOU SENDO IMPORTADO, CHEGUEI AQUI?');
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
