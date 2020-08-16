import { ConnectionOptions } from 'typeorm';

export interface AppConfiguration {
  database: ConnectionOptions;
}

export const config: AppConfiguration = {
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'MtG@Back',
    database: 'mtga',
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migration/*{.ts,.js}`],
    cli: {
      migrationsDir: `${__dirname}/migration`,
    },
    synchronize: false,
    migrationsRun: true,
    logging: false,
  },
};
