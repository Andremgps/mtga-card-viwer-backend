import { ConnectionOptions } from 'typeorm';

export interface AppConfiguration {
  database: ConnectionOptions;
}

export const config: AppConfiguration = {
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'MtG@Back',
    database: 'mtga',
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migration/*{.ts,.js}`],
    cli: {
      migrationsDir: 'src/migration',
    },
    synchronize: true,
    logging: true,
  },
};
