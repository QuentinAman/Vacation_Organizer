import { Luggage } from "@models"
import { GraphQLError } from "graphql"
import { Error } from "@enums"
import type { FindOptions } from "sequelize"

export class LuggagesDataSource {
  async getById(
    id: string,
    disableCheck: boolean = false,
    options?: FindOptions
  ): Promise<Luggage | null> {
    const luggage = await Luggage.findByPk(id, { ...options })

    if (!disableCheck && !luggage) {
      throw new GraphQLError(Error.LUGGAGE_NOT_FOUND)
    }

    return luggage
  }

  async getByIds(ids: string[]): Promise<Luggage[]> {
    return Luggage.findAll({ where: { id: ids } })
  }

  async getAll(): Promise<Luggage[]> {
    return Luggage.findAll()
  }

  async getByTripId(tripId: string): Promise<Luggage[]> {
    return Luggage.findAll({ where: { tripId } })
  }
}
