import { Item } from "@models"
import { GraphQLError } from "graphql"
import { Error } from "@enums"
import type { FindOptions } from "sequelize"

export class ItemsDataSource {
  async getById(
    id: string,
    disableCheck: boolean = false,
    options?: FindOptions
  ): Promise<Item | null> {
    const item = await Item.findByPk(id, { ...options })

    if (!disableCheck && !item) {
      throw new GraphQLError(Error.LUGGAGE_NOT_FOUND)
    }

    return item
  }

  async getByIds(ids: string[]): Promise<Item[]> {
    return Item.findAll({ where: { id: ids } })
  }

  async getAll(): Promise<Item[]> {
    return Item.findAll()
  }

  async getByLuggageId(luggageId: string): Promise<Item[]> {
    return Item.findAll({ where: { luggageId } })
  }
}
