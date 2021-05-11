import { Module } from '@nestjs/common';
export const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? 'dev F' : 'prod F';
  },
};

function createConnection() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Connection established');
    }, 1500);
  });
}

export const asyncProvider = {
  provide: 'ASYNC_CONNECTION',
  useFactory: async () => {
    const connection = await createConnection();
    return connection;
  },
};

const connection = {
  a: 1,
  b: 2,
  c: 3,
};

@Module({
  providers: [
    configFactory,
    { provide: 'CONNECTION', useValue: connection },
    asyncProvider,
  ],
  exports: [configFactory, 'CONNECTION', asyncProvider],
})
export class CustomModule {}
