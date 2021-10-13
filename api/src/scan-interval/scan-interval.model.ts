import { Model, Table, Column, DataType } from 'sequelize-typescript';

interface ScanIntervalCreationAttrs {
  id: number;
  interval: number;
}

@Table({ tableName: 'scan_interval' })
export class ScanInterval extends Model<
  ScanInterval,
  ScanIntervalCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  interval: number;

  @Column({ type: DataType.STRING, defaultValue: 'millisecond' })
  unitTime: string;
}
