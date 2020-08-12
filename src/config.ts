import { ConnectionOptions } from 'typeorm';

export interface AppConfiguration {
  database: ConnectionOptions;
}

export const config: AppConfiguration = {
  database: {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migration/*{.ts,.js}`],
    cli: {
      migrationsDir: 'src/migration',
    },
    synchronize: true,
    logging: true,
  },
};
