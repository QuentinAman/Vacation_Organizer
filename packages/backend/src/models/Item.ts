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

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(true)
  @Column(DataType.INTEGER)
  quantity!: number

  @Default(0)
  @Column(DataType.INTEGER)
  alreadyPacked!: number
}
