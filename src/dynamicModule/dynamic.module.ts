import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';
console.log('CHEGUEI AQUI? 11');
// So in nest, note that, we only reach this module if it is imported in another module,
// through @Module or inject: [] in useFactories, as commented import in cats module
@Module({})
export class DynamicModuleConfig {
  static register(options): DynamicModule {
    return {
      module: DynamicModuleConfig,
      providers: [
        ConfigService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [ConfigService],
    };
  }
}
