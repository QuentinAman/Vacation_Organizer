import { Luggage } from "@models"
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  AllowNull,
  Default,
} from "sequelize-typescript"

@Table({
  timestamps: false,
})
export class Item extends Model {
  @BelongsTo(() => Luggage)
  luggage!: Luggage

  @ForeignKey(() => Luggage)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  luggageId!: number

  @AllowNull(true)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity!: number

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  packed!: boolean
}
