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
import { Role, UserTrip } from "@models"

@Table
export class User extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string

  @AllowNull(true)
  @Column(DataType.STRING)
  image!: string

  @BelongsTo(() => Role)
  role!: Role

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  roleId!: number

  @HasMany(() => UserTrip)
  userTrips!: UserTrip[]
}
