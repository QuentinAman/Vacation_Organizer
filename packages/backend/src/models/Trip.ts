import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript"
import { Luggage, UserTrip } from "@models"

@Table
export class Trip extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(true)
  @Column(DataType.DATE)
  startDate!: Date

  @AllowNull(true)
  @Column(DataType.DATE)
  endDate!: Date

  @AllowNull(true)
  @Column(DataType.STRING)
  location!: string

  @AllowNull(true)
  @Column(DataType.STRING)
  image!: string

  @HasMany(() => Luggage)
  luggages!: Luggage[]

  @HasMany(() => UserTrip)
  userTrips!: UserTrip[]
}
