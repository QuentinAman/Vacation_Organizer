import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript"
import { Trip, User } from "@models"

@Table({
  timestamps: false,
})
export class UserTrip extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => Trip)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  tripId!: number

  @BelongsTo(() => Trip)
  trip!: Trip
}
