import { Model, Table, Column, PrimaryKey, DataType, AutoIncrement } from 'sequelize-typescript';

@Table
export class Quest extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id?: number;

    @Column(DataType.TEXT)
    name!: string;

    @Column(DataType.TEXT)
    npcName!: string;

    @Column(DataType.TEXT)
    npcMap!: string;
}