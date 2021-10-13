import { Model, Table, Column, DataType } from 'sequelize-typescript';

interface PriceHistoryCreationAttrs {
  price: number;
}

@Table({ tableName: 'price_history' })
export class PriceHistory extends Model<
  PriceHistory,
  PriceHistoryCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  price: number;
}
