import { Item, Trip } from "@models"
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript"

@Table({
  timestamps: false,
})
export class Luggage extends Model {
  @HasMany(() => Item)
  items!: Item[]

  @ForeignKey(() => Trip)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  tripId!: number

  @BelongsTo(() => Trip)
  trip?: Trip

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(true)
  @Column(DataType.STRING)
  image!: string
}
