import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { ItemQuest } from '../models/ItemQuest';
import { Quest } from '../models/Quest';
import { Item } from '../models/Item';

const {
    DB_DIALECT,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env;

const databaseConfig = {
    host: DB_HOST!,
    dialect: DB_DIALECT,
    port: parseInt(DB_PORT!),
    // logging: false,
    models: [ItemQuest, Quest, Item]
} as SequelizeOptions

export const sequelize = new Sequelize(DB_DATABASE!, DB_USERNAME!, DB_PASSWORD!, databaseConfig);
