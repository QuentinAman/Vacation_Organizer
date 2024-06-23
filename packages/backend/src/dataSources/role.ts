import { Role } from "@models"
import { GraphQLError } from "graphql"
import { Error } from "@enums"
import type { FindOptions } from "sequelize"
import type { Roles } from "@enums"

export class RolesDataSource {
  async getById(
    id: string,
    disableCheck: boolean = false,
    options?: FindOptions
  ): Promise<Role | null> {
    const role = await Role.findByPk(id, { ...options })

    if (!disableCheck && !role) {
      throw new GraphQLError(Error.ROLE_NOT_FOUND)
    }

    return role
  }

  async getByIds(ids: string[]): Promise<Role[]> {
    return Role.findAll({ where: { id: ids } })
  }

  async getAll(): Promise<Role[]> {
    return Role.findAll()
  }

  async getByName(
    name: Roles,
    disableCheck: boolean = false,
    options?: FindOptions
  ): Promise<Role | null> {
    const role = await Role.findOne({ where: { name }, ...options })

    if (!disableCheck && !role) {
      throw new GraphQLError(Error.ROLE_NOT_FOUND)
    }

    return role
  }
}
