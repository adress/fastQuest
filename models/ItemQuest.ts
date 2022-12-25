import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'ItemQuest' })
export class ItemQuest extends Model {
    @Column(DataType.INTEGER)
    itemId!: number;

    @Column(DataType.INTEGER)
    questId!: number;

    @Column(DataType.INTEGER)
    quantity!: number;
}