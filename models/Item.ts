import { Model, Table, Column, PrimaryKey, DataType } from 'sequelize-typescript';

@Table
export class Item extends Model {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.TEXT)
    name!: string;

    @Column(DataType.TEXT)
    readableName!: string;

    @Column(DataType.BOOLEAN)
    isCustom!: boolean;

    @Column(DataType.INTEGER)
    questId!: number;
    
    //campo de ayuda
    quantity?: 0;
    parentId?: 0; 
}