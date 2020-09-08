import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

export interface AppConfiguration {
  database: ConnectionOptions;
}

export const config: AppConfiguration = {
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
