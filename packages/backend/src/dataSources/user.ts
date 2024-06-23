import { User } from "@models"
import { GraphQLError } from "graphql"
import { Error } from "@enums"
import type { FindOptions } from "sequelize"

export class UsersDataSource {
  async getById(id: string | number, options?: FindOptions): Promise<User> {
    const user = await User.findByPk(id, options)
    if (!user) {
      throw new GraphQLError(Error.USER_NOT_FOUND)
    }

    return user
  }

  async getByIds(ids: string[] | number[]): Promise<User[] | null> {
    return User.findAll({ where: { id: ids } })
  }

  async getAll(): Promise<User[]> {
    return User.findAll()
  }

  async getByEmail(
    email: string,
    disableCheck: boolean = false
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } })
    if (!user && !disableCheck) {
      throw new GraphQLError(Error.USER_NOT_FOUND)
    }

    return user
  }
}
