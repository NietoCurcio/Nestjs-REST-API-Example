import { Module } from '@nestjs/common';
export const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? 'dev F' : 'prod F';
  },
};

const connection = {
  a: 1,
  b: 2,
  c: 3,
};
@Module({
  providers: [configFactory, { provide: 'CONNECTION', useValue: connection }],
  exports: [configFactory, 'CONNECTION'],
})
export class CustomModule {}
