import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript"
import { User } from "@models"

@Table({
  timestamps: false,
})
export class Role extends Model<Role> {
  @HasMany(() => User)
  users!: User[]

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string
}
